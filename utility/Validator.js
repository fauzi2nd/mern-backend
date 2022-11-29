const emailRegExp = new RegExp(
  /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,10})+$/
);

const phoneRegExp = new RegExp(/\d{4}-\d{4}-\d{4}/);

export const isEmail = {
  validator: function (v) {
    return emailRegExp.test(v);
  },
  message: (props) => `${props.value} is not a valid email!`,
};

export const emailIsUnique = {
  validator: async function (email) {
    const user = await this.constructor.findOne({ email });
    if (user) {
      return this._id === user._id;
    }
    return true;
  },
  message: (props) => `The specified ${props.value} is already in use.`,
};

export const isPhone = {
  validator: function (v) {
    return phoneRegExp.test(v);
  },
  message: (props) => `${props.value} is not a valid phone number!`,
};
