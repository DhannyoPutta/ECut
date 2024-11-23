import HashMap "mo:base/HashMap";
import Text "mo:base/Text";
import Time "mo:base/Time";
import Nat "mo:base/Nat";
import Iter "mo:base/Iter";
import Array "mo:base/Array";
import Float "mo:base/Float";

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
    barberShopLocation : Text;
    barberShopRating : Float;
    userId : Text;
  };

  type BarberShopCreate = {
    barberShopName : Text;
    barberShopLocation : Text;
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

  private var idCounters = HashMap.HashMap<Text, Nat>(0, Text.equal, Text.hash);
  private var users = HashMap.HashMap<Text, User>(0, Text.equal, Text.hash);
  private var services = HashMap.HashMap<Text, Service>(0, Text.equal, Text.hash);
  private var transactions = HashMap.HashMap<Text, Transaction>(0, Text.equal, Text.hash);
  private var reviews = HashMap.HashMap<Text, Review>(0, Text.equal, Text.hash);
  private var barberShops = HashMap.HashMap<Text, BarberShop>(0, Text.equal, Text.hash);
  private var employees = HashMap.HashMap<Text, Employee>(0, Text.equal, Text.hash);

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

  public query func hello() : async Text {
    return "Hello";
  };

  public func create_user(user : UserCreate) : async ?User {
    if (Text.size(user.userName) <= 4) {
      return null;
    };

    let userId = generate_id("User");

    let newUser : User = {
      userId;
      userName = user.userName;
      userEmail = user.userEmail;
      userPassword = user.userPassword;
    };

    users.put(userId, newUser);

    return ?newUser;
  };

  public query func read_users(userId : Text) : async ?User {
    return users.get(userId);
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

  public func create_transaction(transaction : TransactionCreate) : async ?Transaction {

    let totalAmount = calculateTotalAmount(transaction.services);
    if (totalAmount == 0) {
      return null;
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
    return ?newTransaction;
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

  public func create_review(review : ReviewCreate) : async ?Review {
    // Validate rating range
    if (review.reviewRating < 0 or review.reviewRating > 5) {
      return null;
    };

    // Verify reviewer exists
    switch (users.get(review.reviewerId)) {
      case null { return null };
      case (?reviewer) {
        // Validate reviewee based on review type
        switch (review.reviewType) {
          case (#Employee) {
            switch (employees.get(review.revieweeId)) {
              case null { return null }; // Employee doesn't exist
              case (?employee) {
                return createReviewRecord(review);
              };
            };
          };
          case (#BarberShop) {
            switch (barberShops.get(review.revieweeId)) {
              case null { return null }; // Barbershop doesn't exist
              case (?barberShop) {
                return createReviewRecord(review);
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

  public query func read_reviews_by_reviewee(revieweeId : Text) : async [Review] {
    let allReviews = Iter.toArray(reviews.vals());
    return Array.filter(
      allReviews,
      func(review : Review) : Bool {
        review.revieweeId == revieweeId;
      },
    );
  };

  public query func get_entity_reviews(entityId : Text) : async [Review] {
    let allReviews = Iter.toArray(reviews.vals());
    return Array.filter(
      allReviews,
      func(review : Review) : Bool {
        review.revieweeId == entityId;
      },
    );
  };

  public query func get_entity_average_rating(entityId : Text) : async ?Float {
    let entityReviews = Array.filter(
      Iter.toArray(reviews.vals()),
      func(review : Review) : Bool {
        review.revieweeId == entityId;
      },
    );

    if (entityReviews.size() == 0) {
      return null;
    };

    var totalRating : Float = 0;
    for (review in entityReviews.vals()) {
      totalRating += review.reviewRating;
    };

    return ?(totalRating / Float.fromInt(entityReviews.size()));
  };

  public query func get_average_rating(reviewerId : Text) : async ?Float {
    let revieweeReviews = Array.filter(
      Iter.toArray(reviews.vals()),
      func(review : Review) : Bool {
        review.reviewerId == reviewerId;
      },
    );

    if (revieweeReviews.size() == 0) {
      return null;
    };

    var totalRating : Float = 0;
    for (review in revieweeReviews.vals()) {
      totalRating += review.reviewRating;
    };

    return ?(totalRating / Float.fromInt(revieweeReviews.size()));
  };

  public func create_barber_shop(barberShop : BarberShopCreate) : async ?BarberShop {
    if (Text.size(barberShop.barberShopName) <= 4) {
      return null;
    };

    switch (users.get(barberShop.userId)) {
      case null { return null };
      case (?user) {

        let barberShopId = generate_id("BarberShop");

        let newBarberShop : BarberShop = {
          barberShopId;
          barberShopName = barberShop.barberShopName;
          barberShopLocation = barberShop.barberShopLocation;
          barberShopRating = 0;
          userId = barberShop.userId;
        };

        barberShops.put(barberShopId, newBarberShop);
        return ?newBarberShop;
      };
    };
  };

  public func get_barber_shop(barberShopId : Text) : async ?BarberShop {
    return barberShops.get(barberShopId);
  };

  public func create_employee(employee : EmployeeCreate) : async ?Employee {
    if (employee.employeeRating < 0 or employee.employeeRating > 5) {
      return null;
    };

    switch (users.get(employee.userId)) {
      case null { return null };
      case (?user) {

        switch (barberShops.get(employee.barberShopId)) {
          case null { return null };
          case (?barbershop) {
            let existingEmployees = Iter.toArray(employees.vals());
            let hasExistingEmployee = Array.find<Employee>(
              existingEmployees,
              func(emp : Employee) : Bool {
                emp.userId == employee.userId;
              },
            );

            switch (hasExistingEmployee) {
              case (?existing) { return null };
              case null {
                let employeeId = generate_id("Employee");

                let newEmployee : Employee = {
                  employeeId;
                  userId = employee.userId;
                  employeeRating = employee.employeeRating;
                  barberShopId = employee.barberShopId;
                };

                employees.put(employeeId, newEmployee);
                return ?newEmployee;
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

  public func update_employee_rating(employeeId : Text, newRating : Float) : async Bool {
    if (newRating < 0 or newRating > 5) {
      return false;
    };

    switch (employees.get(employeeId)) {
      case null { return false };
      case (?existingEmployee) {
        let updatedEmployee : Employee = {
          employeeId = existingEmployee.employeeId;
          userId = existingEmployee.userId;
          employeeRating = newRating;
          barberShopId = existingEmployee.barberShopId;
        };
        employees.put(employeeId, updatedEmployee);
        return true;
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
};
