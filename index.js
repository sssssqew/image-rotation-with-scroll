let scrollableSection = document.querySelector('.scrollable')
let images = [...document.querySelectorAll('.img')]

let current = 0
let target = 0
let ease = 0.03

document.body.style.height = `${scrollableSection.getBoundingClientRect().height}px`

images.forEach((image, idx) => {
    image.style.backgroundImage = `url(./images/${idx+1}.jpeg)`
})

function lerp(start, end, t){
    return start * (1 - t) + end * t
}

// top : 이미지와 브라우저 상단간의 거리 
// top : 스크롤을 내리면 이미지가 브라우저 상단에 가까워지므로 양수이면서 점점 작아진다.
// 그러므로 이미지의 로테이션 각도는 점점 작아지다가 이미지가 브라우저 상단과 일치하면 로테이션 각도는 제로다.
// top (음수): 스크롤을 계속 올려서 이미지가 브라우저 상단보다 위로 올라가면 top 은 음수가 되고 점점 커지므로 이미지는 반대방향으로 로테이션이 증가한다. 
function animate(){
    target = window.scrollY
    current = lerp(current, target, ease)
    scrollableSection.style.transform = `translate3d(0, ${-current}px, 0)`
    images.forEach(image => {
        let top = image.parentElement.getBoundingClientRect().top 
        // image.style.transform = `rotatex(${top * 0.1}deg) rotatey(${top * 0.1}deg)` // 3d 로테이션 애니메이션 (주석해제)
        // 스크롤을 내리면 current 는 target 을 항상 쫓아가므로 target - current 는 항상 양수이므로 해당 방향으로 이미지가 로테이션된다.
        // 스크롤을 올리면 target 이 current 보다 작으므로 target - current 는 음수가 되므로 반대방향으로 이미지가 로테이션된다.
        image.style.transform = `rotatex(${(target - current) * 0.05}deg)` // 쉐이킹 애니메이션 


    })
    requestAnimationFrame(animate)
}

animate()