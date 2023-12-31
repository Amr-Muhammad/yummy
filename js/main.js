var flag1, flag2, flag3, flag4, flag5, flag6
$(document).ready(async function () {
    await getHomeMeals('home')
    $('.loadingAnimation').fadeOut(2000)
})



// Navbar   ↓↓↓
function closeSideBar() {
    $('navBar').animate({ left: `-${$('.blackPart').width()}px` }, 500)
    $('.fa-x').addClass('d-none').removeClass('d-block')
    $('.fa-align-justify').removeClass('d-none').addClass('d-block')
    for (let i = 0; i < $('li').length; i++) {
        $('li').eq(i).animate({ top: '200' }, 100, 'swing')
    }
}

function openSideBar() {
    $('navBar').animate({ left: 0 }, 500)
    $('.fa-align-justify').addClass('d-none').removeClass('d-block')
    $('.fa-x').removeClass('d-none').addClass('d-block')
    for (let i = 0; i < $('li').length; i++) {
        $('li').eq(i).animate({ top: '0' }, i * 100, 'linear')
    }
}


//? agrb ast5dm toggle 3la show w hide aw animate 3la el dipslay lgoz2 el blackPart
$('.crossIcon').click(function () {
    $('.loadingAnimation').css('z-index', '1')      //3shan el navbar yb2a fo2 el loading animation

    if ($('navBar').css('left') == '0px') {
        closeSideBar()
    } else {
        openSideBar()
    }

});



//? Shows the section related to the li clicked
$('li').click(function () {
    $('body').children().not('navBar').not('.loadingAnimation').addClass('d-none').removeClass('d-block') //m3 kol 7aga h5tarha fi el li y2fl koool el scation m3ada el navbar w el loading animation 3shan ysht8l

    //Empty all the inputs
    let lis = document.getElementsByTagName('input')
    for (let i = 0; i < lis.length; i++) {
        lis[i].value = '';
    }
    // -----

    if (this.innerHTML == $('li')[0].innerHTML) {
        closeSideBar()
        $('searchLi').addClass('d-block').removeClass('d-none')

    }
    else if (this.innerHTML == $('li')[1].innerHTML) {
        closeSideBar()
        $('.loadingAnimation').fadeIn()

        $('categoriesLi').addClass('d-block').removeClass('d-none')
        getCategories()

    }
    else if (this.innerHTML == $('li')[2].innerHTML) {
        closeSideBar()
        $('.loadingAnimation').fadeIn()

        $('areaLi').addClass('d-block').removeClass('d-none')
        getCountryName()
    }

    else if (this.innerHTML == $('li')[3].innerHTML) {
        closeSideBar()
        $('.loadingAnimation').fadeIn()
        $('.loadingAnimation').fadeOut(300)
        ingredientApi()
    }

    else if (this.innerHTML == $('li')[4].innerHTML) {
        closeSideBar()
        $('home').removeClass('d-block').addClass('d-none')
        $('contactUs').addClass('d-block').removeClass('d-none')
    }
});
// Navbar   ↑↑↑



// Home   ↓↓↓
async function getHomeMeals(id) {
    let req = await fetch(`https://themealdb.com/api/json/v1/1/search.php?s=`)
    let homeMeals = (await req.json()).meals
    // displayMeals(homeMeals, 'home')
    let temp = ''
    for (let i = 0; i < homeMeals.length; i++) {
        temp += `<div class="col-md-3 ">
    <div mealId=${homeMeals[i].idMeal} class="meal h-100 w-100 rounded-3 text-light position-relative overflow-hidden">

        <img src="${homeMeals[i].strMealThumb}" class="w-100" alt="">
        <div
            class="layer w-100 d-flex p-2 align-items-center position-absolute start-0  h-100">
            <h3 class="text-black text-start">${homeMeals[i].strMeal}</h3>
        </div>

    </div>
    </div>`

    }
    document.getElementById(id).innerHTML = temp
    getId()
}
// Home   ↑↑↑


// Search  ↓↓↓
$('#searchByName').keyup(async function () {


    let req = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${$('#searchByName')[0].value}`)
    let data = (await req.json()).meals

    if (data != null) {

        $('.loadingAnimation').fadeIn()

        let temp = ''
        for (let i = 0; i < data.length; i++) {
            temp += `<div class="col-md-3 ">
        <div mealId=${data[i].idMeal} class="meal h-100 w-100 rounded-3 text-light position-relative overflow-hidden">
            <img src="${data[i].strMealThumb}" class="w-100" alt="">
            <div
                class="layer w-100 d-flex p-2 align-items-center position-absolute start-0  h-100">
                <h3 class="text-black text-start">${data[i].strMeal}</h3>
            </div>
        </div>
        </div>`
        }

        document.getElementById("innerSearch").innerHTML = temp

        $('innerSearch').removeClass('d-none')
        $('#innerSearch').css('display', 'flex')
        $('.loadingAnimation').fadeOut(100)
        getId()

    } else {
        $('#innerSearch').css('display', 'none')
    }

})


$('#searchByLetter').keyup(async function () {

    $('.loadingAnimation').fadeIn()

    let req = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${$('#searchByLetter')[0].value ? $('#searchByLetter')[0].value : 'a'}`)
    let data = (await req.json()).meals

    $('.loadingAnimation').fadeOut(100)

    if (data != null) {

        let temp = ''

        for (let i = 0; i < data.length; i++) {
            temp += `<div class="col-md-3 ">
        <div mealId=${data[i].idMeal} class="meal h-100 w-100 rounded-3 text-light position-relative overflow-hidden">
            <img src="${data[i].strMealThumb}" class="w-100" alt="">
            <div
                class="layer w-100 d-flex p-2 align-items-center position-absolute start-0  h-100">
                <h3 class="text-black text-start">${data[i].strMeal}</h3>
            </div>
        </div>
        </div>`

        }
        document.getElementById("innerSearch").innerHTML = temp

        $('innerSearch').removeClass('d-none')
        $('#innerSearch').css('display', 'flex')
        getId()
    } else {
        $('#innerSearch').css('display', 'none')
    }


})
// Search  ↑↑↑



// categories ↓↓↓
async function getCategories() {
    let req = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`)
    let data = (await req.json()).categories
    displayCategories(data)
    $('.loadingAnimation').fadeOut(300)
}


function displayCategories(data) {
    let temp = ''
    for (let i = 0; i < data.length; i++) {
        temp += ` <div class="col-md-3 ">
        <div class="
        meal h-100 w-100 rounded-3 position-relative overflow-hidden">
        
        <img src="${data[i].strCategoryThumb}" class="w-100" alt="">
        <div class="layer d-flex p-2 text-center flex-column align-items-center position-absolute start-0  h-100">
        <h4>${data[i].strCategory}</h4>
        <p class="fs-7">${data[i].strCategoryDescription.split(' ').slice(0, 20).join(' ')}</p>
        </div>
        
        </div>
        </div>`
    }
    document.getElementById('categories').innerHTML = temp
    getMealByCategory()
}


function getMealByCategory() {
    $('.meal').click(function () {
        let categoryName = $(this).children().children('h4').text()
        getMealByCategoryAPI(categoryName)
    })
}


async function getMealByCategoryAPI(mealCategory) {

    let req = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${mealCategory}`)
    let data = (await req.json()).meals
    displayMeals(data, "innerCategories")
    $('categoriesLi').addClass('d-none').removeClass('d-block')
    $('innerCategories').removeClass('d-none').addClass('d-block')
    $('.loadingAnimation').fadeIn()
    getId()
    $('.loadingAnimation').fadeOut(300)

}
// categories ↑↑↑



// area  ↓↓↓
async function getCountryName() {
    let req = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`)
    let countries = (await req.json()).meals
    displayCountries(countries)
};


function displayCountries(countries) {
    let temp = ''
    for (let i = 0; i < countries.length; i++) {
        temp += `<div class="area col-md-3">
        <div class="countries text-light">
            <i class="fa-solid fa-house-laptop fa-4x"></i>
            <h3>${countries[i].strArea}</h3>
        </div>
    </div>`
    }
    document.getElementById('area').innerHTML = temp
    $('.loadingAnimation').fadeOut(300)

    $('.countries').click(function () {
        getArea($(this).children('h3').text());
    })
}


async function getArea(country) {
    $('.loadingAnimation').fadeIn()
    let req = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${country}`)
    let data = (await req.json()).meals
    displayMeals(data, 'area')
    $('.loadingAnimation').fadeOut(300)
    getId()

}


function getId() {
    $('.meal').click(function () {
        let id = this.getAttribute('mealId')
        getIngreApi(id)
    })
}


async function getIngreApi(id) {
    let req = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
    let mealIngre = (await req.json()).meals[0]
    displayIngre(mealIngre)
}


function displayIngre(mealIngre) {
    $('.loadingAnimation').fadeIn()
    let temp = ''
    let spanContainer = ''
    let tags = ''
    let arr = []
    let firstHalf = 'strMeasure'
    let secondHalf = 'strIngredient'
    if (mealIngre.strTags) {
        arr = (mealIngre.strTags).split(",")
        for (let i = 0; i < arr.length; i++) {
            tags += `<span class="bg-danger-subtle px-2 py-1 rounded-2 text-danger-emphasis">${arr[i]}</span>`
        }
    }


    for (let i = 1; i < 20; i++) {
        let firstHalfContainer = firstHalf + i
        let secondHalfContainer = secondHalf + i
        if (mealIngre[firstHalfContainer] != '' && mealIngre[firstHalfContainer] != null && mealIngre[firstHalfContainer] != " ") {
            spanContainer += `<span class="bg-info-subtle px-2 py-1 rounded-2 text-success-emphasis">${mealIngre[firstHalfContainer]} ${mealIngre[secondHalfContainer]}</span > `
        }
    }


    temp += ` <div class="col-md-4" >
                <div>
            <img src="${mealIngre.strMealThumb}"
                class="w-100 rounded-3" alt="">
                <h2>${mealIngre.strMeal}</h2>
        </div>
        </div>

        <div class="col-md-8">
            <h2>Instructions</h2>
            <p class="">${mealIngre.strInstructions}</p>
            <h3>Area : ${mealIngre.strArea}</h3>
            <h3>Category : ${mealIngre.strCategory}</h3>
            <h3 class="mb-3">Recipes :</h3>
            <div id="recipes " class="ms-2 mb-4 d-flex flex-wrap gap-3" >
                ${spanContainer}
            </div>

            <h3 class="mb-3">Tags :</h3>
            <div id="tags" class="ms-2 mb-4 d-flex flex-wrap gap-3">
               ${tags}
            </div>
            <a href="${mealIngre.strSource}" target="_blank" class="text-decoration-none text-white px-3 py-2 bg-success rounded-2">Source</a>
            <a href="${mealIngre.strYoutube}" target="_blank" class="text-decoration-none text-white px-3 py-2 bg-danger rounded-2">Youtube</a>
        </div >`

    document.getElementById('ingredient').innerHTML = temp
    $('innerArea').addClass('d-block').removeClass('d-none')
    $('areaLi').removeClass('d-block').addClass('d-none')
    $('home').removeClass('d-block').addClass('d-none')
    $('innerCategories').addClass('d-none').removeClass('d-block')
    $('innerIngredient').addClass('d-none').removeClass('d-block')
    $('searchLi').addClass('d-none').removeClass('d-block')
    $('innerSearch').addClass('d-none').removeClass('d-block')
    $('.loadingAnimation').fadeOut(300)
}
// area   ↑↑↑



// Ingredient ↓↓↓
async function ingredientApi() {
    let req = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`)
    let data = (await req.json()).meals
    displayIngredient(data)
}


function displayIngredient(data) {
    let temp = ''
    for (let i = 0; i < 20; i++) {
        temp += `<div class="col-md-3">
        <div class="meal">
            <i class="fa-solid fa-drumstick-bite fa-4x"></i>
            <h3>${data[i].strIngredient}</h3>
            <p>${(data[i].strDescription).split(' ').slice(0, 20).join(' ')}</p>
        </div>
    </div>`
    }
    document.getElementById('ingredientLI').innerHTML = temp
    $('ingredientLI').removeClass('d-none').addClass('d-block')
    getCategoryByIngrdient()
}


// innerIngredient
async function getCategoryAPI(meal) {
    let req = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${meal}`)
    let data = (await req.json()).meals
    $('.loadingAnimation').fadeIn()
    displayMeals(data, "innerIngredient")
    $('.loadingAnimation').fadeOut(300)
    $('ingredientLi').addClass('d-none').removeClass('d-block')
    $('innerIngredient').removeClass('d-none').addClass('d-block')
    getId()

}


function getCategoryByIngrdient() {
    $('.meal').click(function () {
        getCategoryAPI($(this).children('h3').text())
    })

}
// Ingredient ↑↑↑





// Display Meals
function displayMeals(data, id) {
    let temp = ''
    let length = 0

    if (data.length < 20) {
        length = data.length
    } else {
        length = 20
    }

    for (let i = 0; i < length; i++) {
        temp += `<div class="col-md-3 ">
    <div mealId=${data[i].idMeal} class="meal h-100 w-100 rounded-3 text-light position-relative overflow-hidden">

        <img src="${data[i].strMealThumb}" class="w-100" alt="">
        <div
            class="layer w-100 d-flex p-2 align-items-center position-absolute start-0  h-100">
            <h3 class="text-black text-start">${data[i].strMeal}</h3>
        </div>

    </div>
    </div>`

    }
    document.getElementById(id).innerHTML = temp
}



//  Regex   ↓↓↓
function checkName() {
    let nameRegex = /^[a-zA-z ]+$/
    return nameRegex.test($('#name').siblings()[0].value)
}

$('#name').siblings().keyup(() => {
    if (checkName()) {
        $('#name').addClass('d-none')
        $('#name').removeClass('d-block')
        $('#name').siblings().addClass('is-valid').removeClass('is-invalid')
        flag1 = true
    } else {
        $('#name').addClass('d-block')
        $('#name').removeClass('d-none')
        $('#name').siblings().addClass('is-invalid').removeClass('is-valid')
        flag1 = false

    }
    test()
})


function checkEmail() {
    let emailRegex = /^[-a-zA-Z0-9!#\$%\^&\*_=\+\\/]+@[-a-zA-Z0-9!#\$%\^&\*_=\+\\/]+\.[-a-zA-Z0-9!#\$%\^&\*_=\+\\/]{2,}$/
    return emailRegex.test($('#email').siblings()[0].value)
}

$('#email').siblings().keyup(() => {
    if (checkEmail()) {
        $('#email').addClass('d-none')
        $('#email').removeClass('d-block')
        $('#email').siblings().addClass('is-valid').removeClass('is-invalid')
        flag2 = true
    } else {
        $('#email').addClass('d-block')
        $('#email').removeClass('d-none')
        $('#email').siblings().addClass('is-invalid').removeClass('is-valid')
        flag2 = false

    }
    test()
})


function checkPhone() {
    // let phoneRegex = /^(\+)?((\()\d{2,3}(\)))? ?-?\d{3}-? ?\d{4}\d{0,5}?$/
    let phoneRegex = /^[\+]?[(]?[0-9]{2,3}[)]?\s?[0-9]{3,4}\s?[0-9]{4}\s?[0-9]{0,4}?$/
    return phoneRegex.test($('#phone').siblings()[0].value)
}

$('#phone').siblings().keyup(() => {
    if (checkPhone()) {
        $('#phone').addClass('d-none')
        $('#phone').removeClass('d-block')
        $('#phone').siblings().addClass('is-valid').removeClass('is-invalid')
        flag3 = true
    } else {
        $('#phone').addClass('d-block')
        $('#phone').removeClass('d-none')
        $('#phone').siblings().addClass('is-invalid').removeClass('is-valid')
        flag3 = false

    }
    test()
})


function checkAge() {
    let ageRegex = /^(0?[1-9]|[1-9][0-9]?|100)$/
    return ageRegex.test($('#age').siblings()[0].value)
}

$('#age').siblings().keyup(() => {
    if (checkAge()) {
        $('#age').addClass('d-none')
        $('#age').removeClass('d-block')
        $('#age').siblings().addClass('is-valid').removeClass('is-invalid')
        flag4 = true
    } else {
        $('#age').addClass('d-block')
        $('#age').removeClass('d-none')
        $('#age').siblings().addClass('is-invalid').removeClass('is-valid')
        flag4 = false

    }
    test()
})


function checkPassword() {
    let passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/
    return passwordRegex.test($('#password').siblings()[0].value)
}

$('#password').siblings().keyup(() => {
    if (checkPassword()) {
        $('#password').addClass('d-none')
        $('#password').removeClass('d-block')
        $('#password').siblings().addClass('is-valid').removeClass('is-invalid')
        flag5 = true
    } else {
        $('#password').addClass('d-block')
        $('#password').removeClass('d-none')
        $('#password').siblings().addClass('is-invalid').removeClass('is-valid')
        flag5 = false

    }
    test()
    checkRepassword() //3shan lw el repassword kan 3amel match wna 8yrt el password el repassword ta5od balha wtt2sr brdo
})


function checkRepassword() {
    if ($('#repassword').siblings()[0].value == $('#password').siblings()[0].value) {
        $('#repassword').addClass('d-none')
        $('#repassword').removeClass('d-block')
        $('#repassword').siblings().addClass('is-valid').removeClass('is-invalid')
        flag6 = true
    }
    else {
        $('#repassword').addClass('d-block')
        $('#repassword').removeClass('d-none')
        $('#repassword').siblings().addClass('is-invalid').removeClass('is-valid')
        flag6 = false

    }
    test()
}

$('#repassword').siblings().keyup(checkRepassword)
//  Regex   ↑↑↑


// check submit BTN
function test() {
    if (flag1 == true && flag2 == true && flag3 == true && flag4 == true && flag5 == true && flag6 == true) {
        $('.submitBtn').removeAttr('disabled')
    } else {
        $('.submitBtn').attr('disabled', 'disabled')
    }
}






