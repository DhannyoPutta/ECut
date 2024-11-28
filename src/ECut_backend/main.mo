import HashMap "mo:base/HashMap";
import Text "mo:base/Text";
import Time "mo:base/Time";
import Nat "mo:base/Nat";
import Iter "mo:base/Iter";
import Array "mo:base/Array";
import Float "mo:base/Float";
import Result "mo:base/Result";

actor ECut {
  public type Time = Time.Time;

  type User = {
    userId : Text;
    userName : Text;
    userEmail : Text;
    userPassword : Text;
  };

  type UserCreate = {
    userName : Text;
    userEmail : Text;
    userPassword : Text;
  };

  type BarberShop = {
    barberShopId : Text;
    barberShopName : Text;
    barberShopLatitude : Float;
    barberShopLongitude : Float;
    barberShopRating : Float;
    userId : Text;
  };

  type BarberShopCreate = {
    barberShopName : Text;
    barberShopLatitude : Float;
    barberShopLongitude : Float;
    barberShopRating : Float;
    userId : Text;
  };

  type Employee = {
    employeeId : Text;
    userId : Text;
    employeeRating : Float;
    barberShopId : Text;
  };

  type EmployeeCreate = {
    userId : Text;
    employeeRating : Float;
    barberShopId : Text;
  };

  type Service = {
    serviceId : Text;
    serviceName : Text;
    servicePrice : Nat;
    barberShopId : Text;
  };

  type ServiceCreate = {
    serviceName : Text;
    servicePrice : Nat;
    barberShopId : Text;
  };

  type Transaction = {
    transactionId : Text;
    customerId : Text;
    employeeId : Text;
    barberShopId : Text;
    services : [Text];
    date : Time;
    totalAmount : Nat;
  };

  type TransactionCreate = {
    customerId : Text;
    employeeId : Text;
    barberShopId : Text;
    services : [Text];
  };

  type ReviewType = {
    #Employee;
    #BarberShop;
  };

  type Review = {
    reviewId : Text;
    reviewerId : Text;
    revieweeId : Text;
    reviewType : ReviewType;
    reviewContent : Text;
    reviewRating : Float;
    reviewDate : Time;
  };

  type ReviewCreate = {
    reviewerId : Text;
    revieweeId : Text;
    reviewType : ReviewType;
    reviewComment : Text;
    reviewRating : Float;
  };

  type Session = {
    userId : Text;
    token : Text;
    createdAt : Time.Time;
    expiresAt : Time.Time;
  };

  private var idCounters = HashMap.HashMap<Text, Nat>(0, Text.equal, Text.hash);
  private var users = HashMap.HashMap<Text, User>(0, Text.equal, Text.hash);
  private var services = HashMap.HashMap<Text, Service>(0, Text.equal, Text.hash);
  private var transactions = HashMap.HashMap<Text, Transaction>(0, Text.equal, Text.hash);
  private var reviews = HashMap.HashMap<Text, Review>(0, Text.equal, Text.hash);
  private var barberShops = HashMap.HashMap<Text, BarberShop>(0, Text.equal, Text.hash);
  private var employees = HashMap.HashMap<Text, Employee>(0, Text.equal, Text.hash);
  private var sessions = HashMap.HashMap<Text, Session>(10, Text.equal, Text.hash);

  private func generate_id(entityType : Text) : Text {
    let currentId = switch (idCounters.get(entityType)) {
      case (?id) { id };
      case null { 0 };
    };
    let nextId = currentId + 1;
    idCounters.put(entityType, nextId);
    return Nat.toText(nextId);
  };

  private func calculateTotalAmount(serviceIds : [Text]) : Nat {
    var total = 0;
    for (serviceId in serviceIds.vals()) {
      switch (services.get(serviceId)) {
        case (?service) {
          total += service.servicePrice;
        };
        case null {};
      };
    };
    total;
  };

  private func createReviewRecord(review : ReviewCreate) : ?Review {
    let reviewId = generate_id("Review");

    let newReview : Review = {
      reviewId;
      reviewerId = review.reviewerId;
      revieweeId = review.revieweeId;
      reviewType = review.reviewType;
      reviewContent = review.reviewComment;
      reviewRating = review.reviewRating;
      reviewDate = Time.now();
    };

    reviews.put(reviewId, newReview);
    return ?newReview;
  };

  private func calculateAverageRating(currentRating : ?Float, existingReviews : [Review], newReviewRating : Float) : Float {
    let baseRating = switch (currentRating) {
      case null { 0.0 };
      case (?rating) { rating };
    };

    let totalReviews = existingReviews.size() + 1;
    let totalRating = baseRating * Float.fromInt(existingReviews.size()) + newReviewRating;

    totalRating / Float.fromInt(totalReviews);
  };

  private func generateToken(userId : Text) : Text {
    let timestamp = Time.now();

    let timestampText = debug_show (timestamp);

    let rawToken = userId # "_" # timestampText;

    // this is where you operate the rawtoken

    return rawToken;
  };

  public func create_user(user : UserCreate) : async Result.Result<User, Text> {
    if (Text.size(user.userName) <= 4) {
      return #err("Username must be longer than 4 characters");
    };

    let userId = generate_id("User");

    let newUser : User = {
      userId;
      userName = user.userName;
      userEmail = user.userEmail;
      userPassword = user.userPassword;
    };

    users.put(userId, newUser);

    return #ok(newUser);
  };

  public query func read_users(userId : Text) : async ?User {
    return users.get(userId);
  };

  public query func get_all_users() : async [User] {
    return Iter.toArray(Iter.map<(Text, User), User>(users.entries(), func(entry) { entry.1 }));
  };

  public func login(userEmail : Text, password : Text) : async Result.Result<Text, Text> {
    let userEntry = Iter.find(users.entries(), func((id, user) : (Text, User)) {
        user.email == userEmail
    });

    switch (userEntry) {
        case (null) {
            return #err("User not found");
        };
        case (?(userId, user)) {
            if (user.userPassword != password) {
                return #err("Invalid password");
            };

            let token = generateToken(userId);

            let session : Session = {
                userId = userId;
                token = token;
                createdAt = Time.now();
                expiresAt = Time.now() + 3600_000_000_000;
            };

            sessions.put(token, session);

            return #ok(token);
        };
    };
};

  public func validate_session(token : Text) : async Result.Result<Text, Text> {
    switch (sessions.get(token)) {
      case (null) {
        return #err("Invalid or expired session");
      };
      case (?session) {
        if (Time.now() > session.expiresAt) {
          sessions.delete(token);
          return #err("Session expired");
        };

        return #ok(session.userId);
      };
    };
  };

  public func logout(token : Text) : async Result.Result<Text, Text> {
    switch (sessions.get(token)) {
      case (null) {
        return #err("Invalid session");
      };
      case (?_) {
        sessions.delete(token);
        #ok("Logged out successfully");
      };
    };
  };

  public func create_service(service : ServiceCreate) : async ?Service {
    if (Text.size(service.serviceName) <= 4) {
      return null;
    };

    let serviceId = generate_id("Service");

    let newService : Service = {
      serviceId;
      serviceName = service.serviceName;
      servicePrice = service.servicePrice;
      barberShopId = service.barberShopId;
    };

    services.put(serviceId, newService);

    return ?newService;
  };

  public query func read_services(serviceId : Text) : async ?Service {
    services.get(serviceId);
  };

  public func create_transaction(transaction : TransactionCreate) : async Result.Result<Transaction, Text> {
    let totalAmount = calculateTotalAmount(transaction.services);
    if (totalAmount == 0) {
      return #err("Transaction must include at least one service");
    };

    let transactionId = generate_id("Transaction");

    let newTransaction : Transaction = {
      transactionId;
      customerId = transaction.customerId;
      employeeId = transaction.employeeId;
      barberShopId = transaction.barberShopId;
      services = transaction.services;
      date = Time.now();
      totalAmount;
    };

    transactions.put(transactionId, newTransaction);
    return #ok(newTransaction);
  };

  public query func read_transaction(transactionId : Text) : async ?Transaction {
    return transactions.get(transactionId);
  };

  public query func read_customer_transactions(customerId : Text) : async [Transaction] {
    let allTransactions = Iter.toArray(transactions.vals());
    return Array.filter(
      allTransactions,
      func(transaction : Transaction) : Bool {
        transaction.customerId == customerId;
      },
    );
  };

  public query func read_employee_transactions(employeeId : Text) : async [Transaction] {
    let allTransactions = Iter.toArray(transactions.vals());
    return Array.filter(
      allTransactions,
      func(transaction : Transaction) : Bool {
        transaction.employeeId == employeeId;
      },
    );
  };

  public query func read_barbershop_transactions(barberShopId : Text) : async [Transaction] {
    let allTransactions = Iter.toArray(transactions.vals());
    return Array.filter(
      allTransactions,
      func(transaction : Transaction) : Bool {
        transaction.barberShopId == barberShopId;
      },
    );
  };

  public func create_review(review : ReviewCreate) : async Result.Result<Review, Text> {
    if (review.reviewRating < 0 or review.reviewRating > 5) {
      return #err("Review rating must be between 0 and 5");
    };

    switch (users.get(review.reviewerId)) {
      case null { return #err("Reviewer does not exist") };
      case (?reviewer) {
        switch (review.reviewType) {
          case (#Employee) {
            switch (employees.get(review.revieweeId)) {
              case null { return #err("Employee does not exist") };
              case (?employee) {
                let createdReview = createReviewRecord(review);

                switch (createdReview) {
                  case null { return #err("Failed to create review") };
                  case (?newReview) {
                    let updatedEmployeeRating = calculateAverageRating(
                      ?employee.employeeRating,
                      get_employee_reviews(review.revieweeId), // Corrected function name
                      newReview.reviewRating,
                    );

                    employees.put(
                      review.revieweeId,
                      {
                        employee with
                        employeeRating = updatedEmployeeRating
                      },
                    );

                    return #ok(newReview);
                  };
                };
              };
            };
          };
          case (#BarberShop) {
            switch (barberShops.get(review.revieweeId)) {
              case null { return #err("Barbershop does not exist") };
              case (?barberShop) {
                let createdReview = createReviewRecord(review);

                switch (createdReview) {
                  case null { return #err("Failed to create review") };
                  case (?newReview) {
                    let updatedBarberShopRating = calculateAverageRating(
                      ?barberShop.barberShopRating,
                      get_barber_shop_reviews(review.revieweeId), // Corrected function name
                      newReview.reviewRating,
                    );

                    barberShops.put(
                      review.revieweeId,
                      {
                        barberShop with
                        barberShopRating = updatedBarberShopRating
                      },
                    );

                    return #ok(newReview);
                  };
                };
              };
            };
          };
        };
      };
    };
  };

  public query func read_review(reviewId : Text) : async ?Review {
    return reviews.get(reviewId);
  };

  public query func read_reviews_by_reviewer(reviewerId : Text) : async [Review] {
    let allReviews = Iter.toArray(reviews.vals());
    return Array.filter(
      allReviews,
      func(review : Review) : Bool {
        review.reviewerId == reviewerId;
      },
    );
  };

  public func create_barber_shop(barberShop : BarberShopCreate) : async Result.Result<BarberShop, Text> {
    if (Text.size(barberShop.barberShopName) <= 4) {
      return #err("Barbershop name must be longer than 4 characters");
    };

    switch (users.get(barberShop.userId)) {
      case null { return #err("User does not exist") };
      case (?user) {
        let barberShopId = generate_id("BarberShop");

        let newBarberShop : BarberShop = {
          barberShopId;
          barberShopName = barberShop.barberShopName;
          barberShopLatitude = barberShop.barberShopLatitude;
          barberShopLongitude = barberShop.barberShopLongitude;
          barberShopRating = 0;
          userId = barberShop.userId;
        };

        barberShops.put(barberShopId, newBarberShop);
        return #ok(newBarberShop);
      };
    };
  };

  public func get_barber_shop(barberShopId : Text) : async ?BarberShop {
    return barberShops.get(barberShopId);
  };

  public query func get_all_barberShops() : async [BarberShop] {
    return Iter.toArray(Iter.map<(Text, BarberShop), BarberShop>(barberShops.entries(), func(entry) { entry.1 }));
  };

  public func create_employee(employee : EmployeeCreate) : async Result.Result<Employee, Text> {
    if (employee.employeeRating < 0 or employee.employeeRating > 5) {
      return #err("Employee rating must be between 0 and 5");
    };

    switch (users.get(employee.userId)) {
      case null { return #err("User does not exist") };
      case (?user) {
        switch (barberShops.get(employee.barberShopId)) {
          case null { return #err("Barbershop does not exist") };
          case (?barbershop) {
            let existingEmployees = Iter.toArray(employees.vals());
            let hasExistingEmployee = Array.find<Employee>(
              existingEmployees,
              func(emp : Employee) : Bool {
                emp.userId == employee.userId;
              },
            );

            switch (hasExistingEmployee) {
              case (?existing) {
                return #err("Employee already exists for this user");
              };
              case null {
                let employeeId = generate_id("Employee");

                let newEmployee : Employee = {
                  employeeId;
                  userId = employee.userId;
                  employeeRating = employee.employeeRating;
                  barberShopId = employee.barberShopId;
                };

                employees.put(employeeId, newEmployee);
                return #ok(newEmployee);
              };
            };
          };
        };
      };
    };
  };

  public query func read_employee(employeeId : Text) : async ?Employee {
    return employees.get(employeeId);
  };

  public query func get_employee_by_user_id(userId : Text) : async ?Employee {
    let allEmployees = Iter.toArray(employees.vals());
    Array.find<Employee>(
      allEmployees,
      func(emp : Employee) : Bool { emp.userId == userId },
    );
  };

  public query func get_barbershop_employees(barberShopId : Text) : async [Employee] {
    let allEmployees = Iter.toArray(employees.vals());
    Array.filter(
      allEmployees,
      func(emp : Employee) : Bool {
        emp.barberShopId == barberShopId;
      },
    );
  };

  public func update_employee_rating(employeeId : Text, newRating : Float) : async Result.Result<Employee, Text> {
    if (newRating < 0 or newRating > 5) {
      return #err("Rating must be between 0 and 5");
    };

    switch (employees.get(employeeId)) {
      case null { return #err("Employee not found") };
      case (?existingEmployee) {
        let updatedEmployee : Employee = {
          employeeId = existingEmployee.employeeId;
          userId = existingEmployee.userId;
          employeeRating = newRating;
          barberShopId = existingEmployee.barberShopId;
        };
        employees.put(employeeId, updatedEmployee);
        return #ok(updatedEmployee);
      };
    };
  };

  public query func read_barbershop_employees(barberShopId : Text) : async [Employee] {
    let allEmployees = Iter.toArray(employees.vals());
    return Array.filter(
      allEmployees,
      func(employee : Employee) : Bool {
        employee.barberShopId == barberShopId;
      },
    );
  };

  public query func get_barbershop_employee_rating(barberShopId : Text) : async ?Float {
    let barbershopEmployees = Array.filter(
      Iter.toArray(employees.vals()),
      func(employee : Employee) : Bool {
        employee.barberShopId == barberShopId;
      },
    );

    if (barbershopEmployees.size() == 0) {
      return null;
    };

    var totalRating : Float = 0;
    for (employee in barbershopEmployees.vals()) {
      totalRating += employee.employeeRating;
    };

    return ?(totalRating / Float.fromInt(barbershopEmployees.size()));
  };

  private func get_employee_reviews(employeeId : Text) : [Review] {
    let filteredReviews = Iter.filter(
      reviews.entries(),
      func((_, review) : (Text, Review)) : Bool {
        review.revieweeId == employeeId and review.reviewType == #Employee
      },
    );

    Iter.toArray(
      Iter.map(
        filteredReviews,
        func((_, review) : (Text, Review)) : Review { review },
      )
    );
  };

  private func get_barber_shop_reviews(barberShopId : Text) : [Review] {
    let filteredReviews = Iter.filter(
      reviews.entries(),
      func((_, review) : (Text, Review)) : Bool {
        review.revieweeId == barberShopId and review.reviewType == #BarberShop
      },
    );

    Iter.toArray(
      Iter.map(
        filteredReviews,
        func((_, review) : (Text, Review)) : Review { review },
      )
    );
  };

};
