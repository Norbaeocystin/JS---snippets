if (document.URL.includes('gclid=')){
var el = document.querySelectorAll("img[src*='call-to-action-buttons-green-22_orig']");
el[0]['src'] = 'http://www.baralaboratory.com/Number2.png';
};
var a = document.querySelectorAll("a[href]");
for (i = 0; i < a.length; i++) {
    a[i].href += "?gclid=1";
}
