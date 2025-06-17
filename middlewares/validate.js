const validate = (schema) => {
  return (req, res, next) => {
    const options = {
      abortEarly: false,
      allowUnknown: false,
    };

    const { error, value } = schema.validate(req.body, options);

    if (error) {
      const errors = error.details.map((d) => d.message);
      return res.status(400).json({ errors });
    }

    req.body = value;
    next();
  };
};

export default validate;
