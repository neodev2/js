# js

useful js stuff...

---

<b>Index:</b>

<ul>
    <li><a href="#draggable">Draggable: Make element(s) draggable</a></li>
    <li><a href="#get-object-keys-by-value">Get object keys by value</a></li>
</ul>

---

<b id="draggable">Draggable:</b>

```javascript
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
```

usage:

```javascript
draggable('.mydiv', {'position': 'fixed','transform': 'none'});
```

---

<b id="get-object-keys-by-value">Get object keys by value:</b> (still under development)
```javascript
function getObjKeysByValue (obj, value, isRoot, isRoot2) {
    var keys = [];
    for (var prop in obj) {
        if (obj.hasOwnProperty (prop)) {
            if (typeof (obj[prop]) === "object") {
                keys.push.apply(keys, getObjKeysByValue (obj[prop], value, prop, obj[prop]));
            }
            if (typeof (obj[prop]) === "string") {
                //if (obj[prop] === value) {
                if (value.test(obj[prop])) {
                    if(isRoot){
                        var xxx = isRoot2;
                        xxx['name'] = isRoot;
                        keys.push(xxx);
                    }else{
                        //keys.push(prop);
                        keys.push('something to implement at this stage xD');
                    }
                }
            }
        }
    }
    return keys;
}

console.log(getObjKeysByValue(obj, /code editor/));
```

v2 by [NikxDa](https://stackoverflow.com/users/4459695/nikxda)

```javascript
function getObjKeysByValue (obj, value, paths, path) {
    paths = paths || [];
    path = path || [];

    for (var prop in obj) {
        if (obj.hasOwnProperty (prop)) {	
            var arr = path.slice ();		
            //console.log ("Property: " +  prop);
            //console.log ("Current path:");
            //console.log (arr);

            if (typeof (obj[prop]) === "object") {
                arr.push (prop);
                getObjKeysByValue (obj[prop], value, paths, arr);
            }

            if (typeof (obj[prop]) === "string") {
                if (obj[prop] === value) {
                    arr.push (prop);
                    paths.push (arr);
                    delete arr;
                }
            }
        }
    }

    return paths;
}

console.log(getObjKeysByValue(obj, 'desktop app, code editor'));
```

---

