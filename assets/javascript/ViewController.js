"use strict";
/* global Model, Utility, moment, Datatable */

class ViewController {

    constructor() {

        this._model = new Model();

        this._scheduleTBL = $('#scheduleTBL');

        // @ts-ignore
        this._schedule = this._scheduleTBL.DataTable({

            "info": false,
            "pagingType": "numbers",
            // data: this._model.getTrainsJSON(),
            columns: [
                { title: "Train Name" },
                { title: "Destination" },
                { title: "Frequency (min)" },
                { title: "Next Arrival" },
                { title: "Minutes Away" }
            ]
        });

        this._trainNameInput = $("#trainNameInput");
        this._destinationInput = $("#destinationInput");
        this._firstTimeInput = $("#firstTimeInput");
        this._frequencyInput = $("#frequencyInput");
        this._addTrainSubmitBtn = $("#addTrainSubmitBtn");

        this.assignSubmitBtnListener();

        this.updateSchedule();
    }

    assignSubmitBtnListener() {

        this._addTrainSubmitBtn.click((event) => {

            event.preventDefault();

            this._trainNameInput.attr("style", "");
            this._destinationInput.attr("style", "");
            this._firstTimeInput.attr("style", "");
            this._frequencyInput.attr("style", "");

            const trainName = this._trainNameInput.val().toString().trim();
            const destination = this._destinationInput.val().toString().trim();
            const firstTime = this._firstTimeInput.val().toString().trim();
            const frequency = this._frequencyInput.val().toString().trim();

            const wasSuccessful = this._model.addTrain(trainName, destination, firstTime, frequency);

            if (wasSuccessful) {

                this._trainNameInput.val("");
                this._destinationInput.val("");
                this._firstTimeInput.val("");
                this._frequencyInput.val("");

                this._schedule.row.add(this._model.getLastTrainJSON()).draw(false);
            }
            else {

                if (trainName.length === 0 && destination.length === 0 && firstTime.length === 0 && frequency.length === 0) {

                    return;
                }

                if (Utility.isTrainNameInValid(trainName)) {

                    this._trainNameInput.attr("style", "border: 2px solid red;");
                }
                else {

                    this._trainNameInput.attr("style", "border: 2px solid green;");
                }

                if (Utility.isDestinationInValid(destination)) {

                    this._destinationInput.attr("style", "border: 2px solid red;");
                }
                else {

                    this._destinationInput.attr("style", "border: 2px solid green;");
                }

                if (Utility.isFirstTimeInValid(firstTime)) {

                    this._firstTimeInput.attr("style", "border: 2px solid red;");
                }
                else {

                    this._firstTimeInput.attr("style", "border: 2px solid green;");
                }

                if (Utility.isFrequencyInValid(frequency)) {

                    this._frequencyInput.attr("style", "border: 2px solid red;");
                }
                else {

                    this._frequencyInput.attr("style", "border: 2px solid green;");
                }
            }
        });
    }

    updateSchedule() {

        setInterval(() => {

            // // @ts-ignore
            // this._schedule.data(this._model.getTrainsJSON());
            // this._schedule.rows().invalidate().draw(false);

            // this._schedule.data().each( function (data) {

            //     data = "Test";
            // });

            // Increment a counter for each row
            // this._schedule.rows().each(function (d) {
            //     d = "test";
            // });

            // // Invalidate all rows and redraw
            // this._schedule.rows().invalidate().draw();

            this._schedule.clear().rows.add(this._model.getTrainsJSON()).draw(false);

            // this._schedule.data(this._model.getTrainsJSON());
            // this._schedule.data().draw();
            // this._schedule.update();

        }, 1000);
    }
}




















// class ViewController {

//     constructor() {

//         this._model = new Model();

//         this._searchInput = $("#searchInput");
//         this._submitBTN = $("#searchInputBtn");
//         this._btnWrapper = $("#btnWrapper");
//         this._searchHistoryBTNs = [];
//         this._gifContainer = $("#gifContainer");
//         this._instructions = $("#instructions");

//         this._generateColors = this.generateBackgroundColors();

//         this._gifPlaceholders = [

//             '<div class="gifWrapper"><div class="gifBox"></div><div class="sideBar"></div></div>',
//             '<div class="gifWrapper"><div class="gifBox"></div><div class="sideBar"></div></div>',
//             '<div class="gifWrapper"><div class="gifBox"></div><div class="sideBar"></div></div>',
//             '<div class="gifWrapper"><div class="gifBox"></div><div class="sideBar"></div></div>',
//             '<div class="gifWrapper"><div class="gifBox"></div><div class="sideBar"></div></div>',
//             '<div class="gifWrapper"><div class="gifBox"></div><div class="sideBar"></div></div>',
//             '<div class="gifWrapper"><div class="gifBox"></div><div class="sideBar"></div></div>',
//             '<div class="gifWrapper"><div class="gifBox"></div><div class="sideBar"></div></div>',
//             '<div class="gifWrapper"><div class="gifBox"></div><div class="sideBar"></div></div>',
//             '<div class="gifWrapper"><div class="gifBox"></div><div class="sideBar"></div></div>'
//         ];

//         $(window).on("renderAllContent", () => {

//             this.renderAllContent();
//         });

//         this.renderAllContent();
//     }

//     * generateBackgroundColors() {

//         yield "background-color: coral;";
//         yield "background-color: rgb(43,121,218);";
//         yield "background-color: khaki;";
//         yield "background-color: pink;";
//         yield "background-color: lightgreen;";

//         yield* this.generateBackgroundColors();
//     }

//     renderAllContent() {

//         this.removeListeners();

//         this.renderSearchHistoryBTNs();

//         this.renderGifs();

//         this.addGifPlaceholders();

//         this.assignListeners();
//     }

//     renderSearchHistoryBTNs() {

//         this._searchHistoryBTNs = [];

//         this._btnWrapper.children(".searchBtn").remove();

//         let count = 0;

//         for (let topic of this._model._topicGifs) {

//             let newBTNId = "btn-" + count;

//             let newSearchBTN = $("<div>").attr("id", newBTNId).addClass("searchBtn");

//             if (topic._isSelected) {

//                 newSearchBTN.addClass("selected").fadeTo(0, 0.25);
//             }

//             let newSelectBTN = $("<div>").text(topic._topic).addClass("selectBtn");

//             let newRemoveBTN = $("<div>").append($("<span>").text("X")).addClass("removeBtn");

//             if ($(window).width() > 768) {

//                 newRemoveBTN.hide(0);
//             }

//             newSearchBTN.append(newSelectBTN).append(newRemoveBTN);

//             this._searchHistoryBTNs.push(newSearchBTN);

//             this._btnWrapper.append(newSearchBTN);

//             count++;
//         }
//     }

//     renderGifs() {

//         this._gifContainer.empty();

//         for (let topicGif of this._model._topicGifs) {

//             if (topicGif._isSelected) {

//                 for (let gif of topicGif._gifHTMLElements) {

//                     let color = this._generateColors.next().value;

//                     let coloredGif = $(gif).attr("style", color);

//                     this._gifContainer.append(coloredGif);
//                 }
//             }
//         }
//     }

//     addGifPlaceholders() {

//         if (this._gifContainer.children().length === 0) {

//             this._instructions.fadeTo(250, 0);

//             for (let placeholder of this._gifPlaceholders) {

//                 let color = this._generateColors.next().value;

//                 let placeholderColored = $(placeholder).attr("style", color);

//                 this._gifContainer.append(placeholderColored);
//             }
//         }
//         else {

//             this._instructions.fadeTo(1000, 1.0);
//         }
//     }

//     assignListeners() {

//         for (let btn of this._searchHistoryBTNs) {

//             let simpleTopic = btn.children(".selectBtn").text();

//             btn.children(".selectBtn").click(() => {

//                 if (btn.hasClass("selected")) {

//                     btn.removeClass("selected");

//                     this._model.unSelectTopic(simpleTopic);

//                     btn.fadeTo(250, 1.0);

//                     this.renderAllContent();
//                 }
//                 else {

//                     btn.addClass("selected");

//                     this._model.selectTopic(simpleTopic);

//                     btn.fadeTo(250, 0.25);
//                 }
//             });

//             btn.children(".removeBtn").click(() => {

//                 this._model.removeTopic(simpleTopic);

//                 this.renderAllContent();
//             });

//             if ($(window).width() > 768) {

//                 btn.mouseenter(() => {

//                     btn.children(".removeBtn").fadeIn(250);
//                 });

//                 btn.mouseleave(() => {

//                     btn.children(".removeBtn").fadeOut(0);
//                 });
//             }
//         }

//         this._submitBTN.click((event) => {

//             event.preventDefault();

//             let newSimpleTopic = this._searchInput.val().toString();

//             this._searchInput.val("");

//             this._model.addTopic(newSimpleTopic.trim());
//         });

//         for (let gifWrapper of this._gifContainer.children()) {

//             let thisElement = $(gifWrapper);

//             $(gifWrapper).find(".gif").click(() => {

//                 let currentSRC = thisElement.find(".gif").attr("src");

//                 let stillSRC = thisElement.find(".gif").attr("still_src");

//                 let animatedSRC = thisElement.find(".gif").attr("animated_src");

//                 if (thisElement.attr("hasclicked") === "false") {

//                     thisElement.find(".gif").attr("src", animatedSRC);
//                 }
//                 else if (currentSRC === stillSRC) {

//                     thisElement.find(".gif").attr("src", animatedSRC);
//                 }
//                 else {

//                     thisElement.find(".gif").attr("src", stillSRC);
//                 }

//                 thisElement.attr("hasclicked", "true");
//             });

//             $(gifWrapper).find(".gif").mouseenter(() => {

//                 if (thisElement.attr("hasclicked") === "false") {

//                     let animatedSRC = thisElement.find(".gif").attr("animated_src");

//                     thisElement.find(".gif").attr("src", animatedSRC);
//                 }
//             });

//             $(gifWrapper).find(".gif").mouseleave(() => {

//                 if (thisElement.attr("hasclicked") === "false") {

//                     let stillSRC = thisElement.find(".gif").attr("still_src");

//                     thisElement.find(".gif").attr("src", stillSRC);
//                 }
//             });
//         }
//     }

//     removeListeners() {

//         for (let btn of this._searchHistoryBTNs) {

//             btn.off();

//             btn.children().off();
//         }

//         this._submitBTN.off();

//         for (let gifWrapper of this._gifContainer.children()) {

//             $(gifWrapper).find(".gif").off();
//         }
//     }
// }