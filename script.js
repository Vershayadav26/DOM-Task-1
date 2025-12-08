var btn = document.querySelector('button')

var main = document.querySelector('main')
var arr = ['Hey ! I am Versha ','sheryians is Best','sarthak bhaiya is Best','Harsh bhaiya is Best']
 btn.addEventListener('click',function(){
var h1 = document.createElement('h1')
var x = Math.random()*80
var y = Math.random()*80
var rot = Math.random()*360
var scl = Math.random()*4
var a = Math.floor(Math.random()*arr.length)

h1.innerHTML = arr[a]
h1.style.position = 'absolute'

h1.style.left = x+'%'
h1.style.top = y+'%'
h1.style.rotate = rot+'deg'
h1.style.scale = scl

main.appendChild(h1)

//     var div = document.createElement('div')

//      var x = Math.random()*100
//     var y = Math.random()*100
//     var r = Math.random()*360
//      var c1 = Math.floor(Math.random()*256)
//        var c2 = Math.floor(Math.random()*256)
//          var c3 = Math.floor(Math.random()*256)


//     div.style.height = '50px'
//     div.style.width = '50px'
//      div.style.position = 'absolute'
//      div.style.backgroundColor = `rgb(${c1},${c2},${c3})`

//      div.style.left = x+'%'
//      div.style.top = y+'%'
//       div.style.rotate = r+ 'deg'

//     main.appendChild(div)
})


// var btn = document.createElement('button')

// btn.innerHTML= 'download'

// btn.style.color ='red'
// var main = document.querySelector('main')

// main.appendChild (btn)








//     var h1 = document.createElement('h1')

//     h1.innerHTML = 'Hello From js'
//   var main =  document.querySelector('main')

// main.appendChild(h1)