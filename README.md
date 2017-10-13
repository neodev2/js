<ul>
    <li><a href="#draggable">Draggable: Make element(s) draggable</a></li>
    <li><a href="#get-object-keys-by-value">Get object keys by value</a></li>
    <li><a href="#jquery-clone-element-loop">jQuery clone element loop</a></li>
</ul>

---

<h3 id="draggable">Draggable:</h3>

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

Usage:

```javascript
draggable('.mydiv', {'position': 'fixed','transform': 'none'});
```

---

<h3 id="get-object-keys-by-value">Get object keys by value: (still under development)</h3>

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

<h3 id="jquery-clone-element-loop">jQuery clone element loop:</h3>

Supposing you have the following structure:

```html
<section>
    <div>
        <h2>Lorem ipsum dolor sit amet</h2>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
    </div>
</section>
```

Then you could clone it in this way:

```javascript
for(var i=0;i<4;i++){
    var img = 'url(https://placeimg.com/1200/900/any?r='+i+')';
    var xxx = $('section').eq(0).clone().css('background-image', img).appendTo('body');
}
$('section').eq(0).remove();
```

---
