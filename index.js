var eventSplitter = /^(\S+)\s*(.*)$/;

module.exports = function(jQuery) {

  function Events(element, view) {
    this.element = element;
    this.view = view;
  }

  Events.prototype.bind = function(key, method) {
    var match = key.match(eventSplitter);
    var event = match[1], selector = match[2];

    event = event + '.' + this.view.cid;

    function callback() {
      if (typeof method === 'function') {
        method.apply(this.view, arguments);    
        return;
      }
      
      if (!this.view[method]) {
        throw new Error(method + ' method is not defined');
      } else {
        this.view[method].apply(this.view, arguments);
      }
    }

    if (selector) {
      jQuery(this.element).on(event, selector, callback);
    } else {
      jQuery(this.element).on(event, callback);
    }
  };

  Events.prototype.unbind = function() {
    jQuery(this.element).off('.' + this.view.cid);
  };

  return {
    _handleElementChange: function () {
      if (this.eventManager) this.eventManager.unbind();
      this.eventManager = new Events(this.el, this);
      this.delegateEvents();
      this._applyBindingsForKey();
      return this;
    }
  };

};
