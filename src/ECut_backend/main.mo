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
    userRole : Text;
    userEmail : Text;
    userPassword : Text;
  };

  type UserCreate = {
    userName : Text;
    userRole : Text;
    userEmail : Text;
    userPassword : Text;
  };

  type BarberShop = {
    barberShopId : Text;
    barberShopName : Text;
    barberShopLocation : Text;
    barberShopRating : Text;
    userId : Text;
  };

  type BarberShopCreate = {
    barberShopName : Text;
    barberShopLocation : Text;

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

  type Review = {
    reviewId : Text;
    reviewerId : Text;
    revieweeId : Text;
    reviewContent : Text;
    reviewRating : Float;
    reviewDate : Time;
  };

  type ReviewCreate = {
    reviewerId : Text;
    revieweeId : Text;
    reviewComment : Text;
    reviewRating : Float;
    reviewDate : Time;
  };

  private var idCounters = HashMap.HashMap<Text, Nat>(0, Text.equal, Text.hash);
  private var users = HashMap.HashMap<Text, User>(0, Text.equal, Text.hash);
  private var services = HashMap.HashMap<Text, Service>(0, Text.equal, Text.hash);
  private var transactions = HashMap.HashMap<Text, Transaction>(0, Text.equal, Text.hash);
  private var reviews = HashMap.HashMap<Text, Review>(0, Text.equal, Text.hash);

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

  public query func hello() : async Text {
    return "Hello";
  };

  public func create_user(user : UserCreate) : async ?User {
    // Validation checks
    if (Text.size(user.userName) <= 4) {
      return null;
    };
    
    if (user.userRole != "Barber" and user.userRole != "Customer" and user.userRole != "Employee") {
      return null;
    };

    let userId = generate_id("User");
    
    let newUser : User = {
      userId;
      userName = user.userName;
      userRole = user.userRole;
      userEmail = user.userEmail;
      userPassword = user.userPassword;
    };

    users.put(userId, newUser);
    
    return ?newUser;
  };

  public query func read_users(userId : Text) : async ?User {
    users.get(userId);
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
    switch (users.get(transaction.employeeId)) {
      case null { return null; };
      case (?employee) {
        if (employee.userRole != "Employee" and employee.userRole != "Barber") {
          return null;
        };
      };
    };

    switch (users.get(transaction.customerId)) {
      case null { return null; };
      case (?customer) {
        if (customer.userRole != "Customer") {
          return null;
        };
      };
    };

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
    return transactions.get(transactionId)
  };

  public query func read_customer_transactions(customerId : Text) : async [Transaction] {
    let allTransactions = Iter.toArray(transactions.vals());
    return Array.filter(allTransactions, func (transaction : Transaction) : Bool {
      transaction.customerId == customerId
    });
  };

  public query func read_employee_transactions(employeeId : Text) : async [Transaction] {
    let allTransactions = Iter.toArray(transactions.vals());
    return Array.filter(allTransactions, func (transaction : Transaction) : Bool {
      transaction.employeeId == employeeId
    });
  };

  public query func read_barbershop_transactions(barberShopId : Text) : async [Transaction] {
    let allTransactions = Iter.toArray(transactions.vals());
    return Array.filter(allTransactions, func (transaction : Transaction) : Bool {
      transaction.barberShopId == barberShopId
    });
  };

  public func create_review(review : ReviewCreate) : async ?Review {
    if (review.reviewRating < 0 or review.reviewRating > 5) {
      return null;
    };

    switch (users.get(review.reviewerId)) {
      case null { return null };
      case (?reviewer) {
        switch (users.get(review.revieweeId)) {
          case null { return null };
          case (?reviewee) {
            let reviewId = generate_id("Review");

            let newReview : Review = {
              reviewId;
              reviewerId = review.reviewerId;
              revieweeId = review.revieweeId;
              reviewContent = review.reviewComment;
              reviewRating = review.reviewRating;
              reviewDate = Time.now();
            };

            reviews.put(reviewId, newReview);
            return ?newReview;
          };
        };
      };
    };
  };

  public query func read_review(reviewId : Text) : async ?Review {
    reviews.get(reviewId)
  };

  public query func read_reviews_by_reviewer(reviewerId : Text) : async [Review] {
    let allReviews = Iter.toArray(reviews.vals());
    return Array.filter(allReviews, func (review : Review) : Bool {
      review.reviewerId == reviewerId
    });
  };

  public query func read_reviews_by_reviewee(revieweeId : Text) : async [Review] {
    let allReviews = Iter.toArray(reviews.vals());
    return Array.filter(allReviews, func (review : Review) : Bool {
      review.revieweeId == revieweeId
    });
  };

  public query func get_average_rating(reviewerId : Text) : async ?Float {
    let revieweeReviews = Array.filter(
      Iter.toArray(reviews.vals()),
      func (review : Review) : Bool {
        review.reviewerId == reviewerId
      }
    );

    if (revieweeReviews.size() == 0) {
      return null;
    };

    var totalRating : Float = 0;
    for (review in revieweeReviews.vals()) {
      totalRating += review.reviewRating;
    };

    return ?(totalRating / Float.fromInt(revieweeReviews.size()))
  };

};