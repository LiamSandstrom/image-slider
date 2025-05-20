const topWrapper = document.querySelector(".top-wrapper");
const container = document.querySelector(".container");
const handle = document.querySelector(".handle");

handle.addEventListener("mousedown", e => {
    console.log("add");
    window.addEventListener("mousemove", dragImage);
});

window.addEventListener("mouseup", e => {
    console.log("remove;")
    window.removeEventListener("mousemove", dragImage);
})

container.addEventListener("wheel", scrollImage);

function scrollImage(e){
    const conRect = container.getBoundingClientRect();
    const handleRect = handle.getBoundingClientRect();
    const topRect = topWrapper.getBoundingClientRect();

    const handlePercent = (handleRect.width / conRect.width) * 100;

    const currPercent = (topRect.width / conRect.width) * 100;
    let percent = (e.deltaY * 2 / conRect.width) * -100;
    percent += currPercent;

    percent = Math.min(Math.max(handlePercent, percent), 100);
    topWrapper.animate(
        {width: `${percent}%`},
        {duration: 1000, fill: "forwards",  easing: "ease-out" }
    );
}

function dragImage(e){
    const conRect = container.getBoundingClientRect();
    const handleRect = handle.getBoundingClientRect();

    const handlePercent = (handleRect.width / conRect.width) * 100;

    let diff = e.clientX - conRect.left;
    let percent = (diff / conRect.width) * 100;
    percent = Math.min(Math.max(handlePercent, percent), 100);
    //topWrapper.style.width = percent + "%";
    topWrapper.animate(
        {width: `${percent}%`},
        {duration: 0, fill: "forwards"}
    );
}
