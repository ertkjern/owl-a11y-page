// Why the fuck Jquery? No idea, did not want to much wierd DOM elements when displaying code.
// With Jquery easy to just manipulate based on IDs without interfering with the original DOM markup like Agular/React etc..

// Predefined owls
const owls = [
    {
        id: 0,
        name: "Snowy",
        img: "Snoy04.jpg"
    },
    {
        id: 1,
        name: "Pygmy",
        img: "34567654345a.jpg"
    },
    {
        id: 2,
        name: "Hubro",
        img: "standard_hubro_shutterstock_115640.jpg"
    },
    {
        id: 3,
        name: "Tower",
        img: "98765r6789876545678.jpg"
    },
];

// dynamic list of my own owls
var myOwls = [
    {
        id: 1,
        name: "Pygmy",
        img: "34567654345a.jpg",
        desc: "The best owl"
    }
];

var numberOfOwls = 0;

// error handling
var owlDescHasError = false;
var owlTypeHasError = false;

init();

function init() {
    createDropdown();
    createOwlList();
}

function createDropdown() {
    var $dropdown = $("#owlType");
    $.each(owls, function () {
        $dropdown.append($("<option />").val(this.id).text(this.name));
    });
}


$("#submitOwl").click(function (event) {
    event.preventDefault();
    addOwlClick();
});

function addOwlClick() {
    const owlDesc = $("#owlDesc").val();
    const owlType = $("#owlType").val();
    resetError();

    if (!owlDesc) {
        owlDescError = true;
        $("#owlDesc").addClass("error");
    }
    if (!owlType && owlType !== "-1") {
        owlTypeHasError = true;
        $("#owlType").addClass("error");
    }
    if (owlDescHasError || owlTypeHasError) {
        return;
    }

    const selectedOwl = {
        ...owls[owlType],
        desc: owlDesc
    };

    myOwls.push(selectedOwl);
    addOwl(selectedOwl);
    resetForm();
}

function createOwlList() {
    $.each(myOwls, function () {
        addOwl(this);
    });
}

function addOwl(owlToAdd) {
    var deleteButton;
    if ($(".good-example").length) {
        deleteButton = "<i id=\"delete" + numberOfOwls + "\" onkeydown=\"deleteOwlKeypress(event, this)\" aria-label=\"delete item\"  role=\"button\" tabindex=\"0\" onclick=\"deleteOwl(this)\" class=\"material-icons trash\">delete_outline\n</i>";
    } else {
        deleteButton = "<i id=\"delete" + numberOfOwls + "\" onclick=\"deleteOwl(this)\" class=\"material-icons trash\">delete_outline\n</i>";
    }
    var $owlList = $("#owlList");
    $owlList.append($(
        "<div id=\"myOwl" + numberOfOwls + "\" class=\"row owl-list\">\n" +
        "        <div class=\"col-10\">\n" +
        "          <img class=\"selected-owl-image\" height=\"100px\" src=\"./../imgs/" + owlToAdd.img + "\">\n" +
        "          <div class=\"selected-owl-desc\">\n" +
        "            <h3>" + owlToAdd.name + "</h3>\n" +
        "            <p>" + owlToAdd.desc + "</p>\n" +
        "          </div>\n" +
        "        </div>\n" +
        "        <div class=\"col-2\">\n" +
        deleteButton +
        "        </div>\n" +
        "      </div>\n"
    ));
    numberOfOwls += 1;
}

function deleteOwlKeypress(event, el) {
    debugger;
    const keycode = (event.keyCode ? event.keyCode : event.which);
    if(keycode == "13"){
        deleteOwl(el);
    }
}

function deleteOwl(element) {
    const id = $(element).attr('id');
    const index = id.replace('delete', '');
    myOwls.slice(index, 1);
    $("#myOwl" + index).remove();
}

function resetError() {
    owlDescHasError = false;
    owlTypeHasError = false;
    $("#owlDesc").removeClass("error");
    $("#owlType").removeClass("error");
}

function resetForm() {
    $("#owlDesc").val("");
    $("#owlType option[value='-1']").prop("selected", true);
}

