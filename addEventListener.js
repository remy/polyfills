// addEventListener polyfill 1.0 / Eirik Backer / MIT Licence
(function() {
    if(window.addEventListener) { return; } //No need to polyfill

    function docHijack(p){var old = document[p];document[p] = function(v){return addListen(old(v))}}
    function addEvent(on, fn, self){
        return (self = this).attachEvent('on' + on, function(e){
            var e = e || window.event;
            e.preventDefault  = e.preventDefault  || function(){e.returnValue = false}
            e.stopPropagation = e.stopPropagation || function(){e.cancelBubble = true}
            fn.call(self, e);
        });
    }
    function addListen(obj, i){
        if(i = obj.length)while(i--)obj[i].addEventListener = addEvent;
        else obj.addEventListener = addEvent;
        return obj;
    }

    addListen([document, windown]);
    if('Element' in window)window.Element.prototype.addEventListener = addEvent;            //IE8
    else{                                                                            //IE < 8
        document.attachEvent('onreadystatechange', function(){addListen(document.all)});        //Make sure we also init at domReady
        docHijack('getElementsByTagName');
        docHijack('getElementById');
        docHijack('createElement');
        addListen(document.all);
    }
})();
