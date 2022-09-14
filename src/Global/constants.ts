const FormFields = {
  firstName: {
    labelFirstName: "First Name",
    nameFirstName: "firstname",
  },
  lastName: {
    labelLastName: "Last Name",
    nameLastName: "lastname",
  },
  email: {
    labelEmail: "Email",
    nameEmail: "email",
  },
  phoneNumber: {
    labelPhoneNumber: "Phone Number",
    namePhoneNumber: "phonenumber",
  },
  password: {
    labelPassword: "Password",
    namePassword: "password",
  },
};

const rules: any = {
  firstName: [
    {
      required: true,
      message: "Please enter a first name",
    },
  ],
  lastName: [
    {
      required: true,
      message: "Please enter a last name",
    },
  ],
  email: [
    {
      type: "email",
      message: "invalid email format",
    },
    {
      required: true,
      message: "please enter a email",
    },
  ],
  phoneNumber: [
    {
      required: true,
      message: "please enter a phone number",
    },
    {
      min: 10,
      message: "invalid phone number",
    },
  ],
  password: [
    {
      required: true,
      message: "please enter a password",
    },
    {
      min: 6,
      message: "Invalid! nedd atleast 6 charactors",
    },
  ],
};

const button = {
  addButton:'Add',
  cancelButton : 'Cancel',
  updateButton :'Update'

}
export { FormFields, rules,button };
