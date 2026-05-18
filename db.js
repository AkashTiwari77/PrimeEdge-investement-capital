/* eslint-env node */
import fs from "fs";
import path from "path";

const DB_PATH = path.join(process.cwd(), "database.json");

class Database {
  constructor() {
    this.data = this.load();
  }

  load() {
    try {
      const raw = fs.readFileSync(DB_PATH, "utf-8");
      return JSON.parse(raw);
    } catch (err) {
      console.error("Failed to load database:", err.message);
      return {
        users: [],
        leads: [],
        consultations: [],
        subscriptions: [],
        contact_submissions: [],
      };
    }
  }

  save() {
    try {
      fs.writeFileSync(DB_PATH, JSON.stringify(this.data, null, 2), "utf-8");
      return true;
    } catch (err) {
      console.error("Failed to save database:", err.message);
      return false;
    }
  }

  // User methods
  findUserByEmail(email) {
    return this.data.users.find((u) => u.email.toLowerCase() === email.toLowerCase());
  }

  findUserById(id) {
    return this.data.users.find((u) => u.id === id);
  }

  createUser(user) {
    const newUser = {
      id: `user_${Date.now()}`,
      createdAt: new Date().toISOString(),
      ...user,
    };
    this.data.users.push(newUser);
    this.save();
    return newUser;
  }

  updateUser(id, updates) {
    const user = this.findUserById(id);
    if (user) {
      Object.assign(user, updates);
      this.save();
    }
    return user;
  }

  // Lead methods
  createLead(lead) {
    const newLead = {
      id: `lead_${Date.now()}`,
      status: "new",
      createdAt: new Date().toISOString(),
      ...lead,
    };
    this.data.leads.push(newLead);
    this.save();
    return newLead;
  }

  getAllLeads() {
    return this.data.leads;
  }

  // Consultation methods
  createConsultation(consultation) {
    const newConsultation = {
      id: `consultation_${Date.now()}`,
      createdAt: new Date().toISOString(),
      ...consultation,
    };
    this.data.consultations.push(newConsultation);
    this.save();
    return newConsultation;
  }

  getConsultationsByUserId(userId) {
    return this.data.consultations.filter((c) => c.userId === userId);
  }

  // Contact submission methods
  createContactSubmission(submission) {
    const newSubmission = {
      id: `contact_${Date.now()}`,
      createdAt: new Date().toISOString(),
      ...submission,
    };
    this.data.contact_submissions.push(newSubmission);
    this.save();
    return newSubmission;
  }

  getAllContactSubmissions() {
    return this.data.contact_submissions;
  }

  // Subscription methods
  createSubscription(subscription) {
    const newSubscription = {
      id: `sub_${Date.now()}`,
      createdAt: new Date().toISOString(),
      ...subscription,
    };
    this.data.subscriptions.push(newSubscription);
    this.save();
    return newSubscription;
  }

  getSubscriptionsByUserId(userId) {
    return this.data.subscriptions.filter((s) => s.userId === userId);
  }
}

export default new Database();
