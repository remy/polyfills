(function (global) {

if (typeof global.DOMTokenList !== 'undefined') return;

function DOMTokenList(el) {
  this._element = el;
  this.push.apply(this, el.className.split(regex));
  // cache it if we can
  if (mutationSupported) {
    el._tokenList = this;
  }
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
  ,div = document.createElement('div')
  ,mutationSupported = false
;

// IE doesn't maintain the length of subclassed arrays but we don't need it
DOMTokenList.prototype = new Array;

for (key in methods) {
  DOMTokenList.prototype[key] = methods[key];
}
global.DOMTokenList = DOMTokenList;

Element.prototype.__defineGetter__('classList', function () {
    return this._tokenList || new DOMTokenList(this);
});

// detech mutation support
div.addEventListener('DOMAttrModified'
  ,function detectMutation() {
    mutationSupported = true;
    this.removeEventListener('DOMAttrModified', detectMutation, false);
  } 
  ,false
);
div.setAttribute('foo', 'bar');
div = null;
document.addEventListener('DOMAttrModified', function (e) { delete e.target._tokenList; }, false);
})(this);