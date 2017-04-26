function draggable(selector, extraCss){
    
    let isMouseDown = false;
    let elems = document.querySelectorAll(selector);
    let elem, l, t;

    for(let i=0; i<elems.length; i++){

        elems[i].ondragstart = function(e){
            e.preventDefault();
        }

        elems[i].onmousedown = function(e){
            isMouseDown = true;
            elem = this;
            l = e.clientX - this.getBoundingClientRect().left;
            t = e.clientY - this.getBoundingClientRect().top;
        }
    }

    document.onmouseup = function(){
        isMouseDown = false;
    }

    document.onmousemove = function(e){
        if(isMouseDown){
            elem.style.left = e.clientX - l +'px';
            elem.style.top = e.clientY - t +'px';
            for(let i in extraCss){
                elem.style[i] = extraCss[i];
            }
        }
    }
    
}
