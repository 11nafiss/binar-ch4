/*
 * Contoh kode untuk membaca query parameter,
 * Siapa tau relevan! :)
 * */

const urlSearchParams = new URLSearchParams(window.location.search);
const params = Object.fromEntries(urlSearchParams.entries());

// Coba olah data ini hehe :)
console.log(params);

/*
 * Contoh penggunaan DOM di dalam class
 * */
const app = new App();

app.init();

// OwlCarousel
$(".owl-carousel").owlCarousel({
    center: true,
    loop: true,
    autoplay: true,
    autoWidth: true,
    autoHeight: true,
    margin: 10,
    nav: true,
    navText: [$(".carousel_prev"), $(".carousel_next")],
    dots: false,
    responsive: {
    0: {
        items: 1
        },
    768: {
        items: 1,
        stagePadding: 50
        },
    },
});