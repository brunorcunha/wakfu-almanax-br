const toCapitalize = function() {
  return this.charAt(0).toUpperCase() + this.slice(1);
};

const pad = function(size = 2) {
  const s = '000000000' + this;
  return s.substr(s.length - size);
};

String.prototype.toCapitalize = toCapitalize;
String.prototype.pad = pad;

Number.prototype.pad = pad;
