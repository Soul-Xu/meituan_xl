(function(){
    var docEl = document.documentElement;

    // 动态设置html的font-size
    function setRemUint(){
        var rem = docEl.clientWidth / 10;
        docEl.style.fontSize = rem + 'px';
    }

    setRemUint();

    window.addEventListener('resize', setRemUint);
})();