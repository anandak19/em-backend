import UserSchema from '../models/user.model.js'

const nameRegex = /^[a-zA-Z\s]+$/;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phoneNumberRegex = /^(\+\d{1,3}[- ]?)?\d{10,13}$/;
const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[^\s]{4,}$/;
const genders = ['male', 'female', 'other']

export const validateName = (name, pos = 'First') => {
  if (
    (!name && name.length < 1) ||
    name > 10 ||
    !nameRegex.test(name)
  ) {
    return `${pos} name must be between 1 and 10 characters long and contain only letters and spaces.`;
  }
  return null;
};


export const validateEmail = async (email) => {
  if (!email || !emailRegex.test(email)) {
    return "Please enter a valid email address";
  }
  return
  const existingUser = await UserSchema.findOne({ email });
  if (existingUser) {
    return "This email is already registered. Please use a different email.";
  }
};

export const validatePhoneNumber = async (phoneNumber) => {
  if (!phoneNumber || !phoneNumberRegex.test(phoneNumber)) {
    return "Please enter a valid phone number";
  }
  return
  const existingUser = await UserSchema.findOne({ phoneNumber });
  if (existingUser) {
    return "This phone number is already registered. Please use a different phone number.";
  }
};

export const validateGender = (gender) => {
    if(!gender || !gender.trim()) {
        return "Gender is required"
    }else if(!genders.includes(gender)){
        return "Invalid gender provided"
    }
}

export const validateJobTitle = (job) => {
    if(!job || !job.trim()){
        return "Job title is required"
    }else if(job.length > 10) {
        return "Invalid job title provided"
    }
}

export const validateSalary = (salary) => {
    if(!salary){
        return "Salary is required"
    }else if(Number.isNaN(salary)) {
        return "Invalid salary"
    }
}


export const validatePassword = (password) => {
  if (!password || !passwordRegex.test(password)) {
    return "Password must be at least 4 characters long and include at least one letter and one number.";
  }
};

// update fields

export const validateUpdatedPhoneNumber = (phoneNumber) => {
  if (!phoneNumber || !phoneNumberRegex.test(phoneNumber)) {
    return "Please enter a valid phone number";
  }
  return null
}

export const validateUpdatedEmail = async (email) => {
  if (!email || !emailRegex.test(email)) {
    return "Please enter a valid email address";
  }
};