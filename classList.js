(function (global) {

if (typeof global.DOMTokenList !== 'undefined') return;

function DOMTokenList(el) {
  this._element = el;
  this.push.apply(this, el.className.split(regex));
};

function setToClassName(el, classes) {
  el.className = classes.join(' ');
}

var
  key
  ,regex = /\s+/g
  ,methods = {
    add: function(token) {
      this.push(token);
      setToClassName(this._element, this);
    },
    contains: function(token) {
      return this.indexOf(token) != -1;
    },
    item: function(index) {
      return this[index] || null;
    },
    remove: function(token) {
      this.splice(this.indexOf(token), 1);
      setToClassName(this._element, this);
    },
    toString: function() {
      return this.join(' ');
    },
    toggle: function(token) {
      this[this.indexOf(token) == -1 ? 'add' : 'remove'](token);
    }
  }
;

// IE doesn't maintain the length of subclassed arrays but we don't need it
DOMTokenList.prototype = new Array;

for (key in methods) {
  DOMTokenList.prototype[key] = methods[key];
}
global.DOMTokenList = DOMTokenList;

Element.prototype.__defineGetter__('classList', function () {
  return new DOMTokenList(this);
});

})(this);