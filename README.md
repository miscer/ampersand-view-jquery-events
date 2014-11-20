ampersand-view-jquery-events
============================

Use jQuery for binding events in delegateEvents.

Usage
=====

```javascript
var $ = require('jquery');
var AmpersandView = require('ampersand-view');
var jqueryEvents = require('ampsersand-view-jquery-events');

FooView = AmpersandView.extend(jqueryEvents($), {
  events: {
    'click .something': '...'
  }
});
```
