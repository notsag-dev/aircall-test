const target = {
  init(name, opt = {}) {
    this.name = name;
    if (opt.email) {
      this.email = opt.email;
    }
    if (opt.phone) {
      this.phone = opt.phone;
    }
  }
}

module.exports = {target};
