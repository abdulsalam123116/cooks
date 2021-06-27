(function($, window, document, undefined) {
    "use strict";
    var pluginName = "apiLimuleClient",
        defaults = {
            partner: 1,
            player: "website-desktop",
            uid_ext_session: "",
            frontaddr: "",
            urlApiWs: "",
            childMod: false,
            env: "prod"
        };

    function Plugin(element, options) {
        this.element = element;
        this.settings = $.extend({}, defaults, options);
        this._defaults = defaults;
        this._name = pluginName;
        this.init()
    }
    $.extend(Plugin.prototype, {
        init: function() {},
        newSession: function(params) {
            var that = this;
            var dfd = new jQuery.Deferred;
            $.ajax({
                url: that.settings.urlApiWs + "/new_session",
                data: {
                    partner: that.settings.partner,
                    player: that.settings.player,
                    uid_ext_session: that.settings.uid_ext_session,
                    frontaddr: that.settings.frontaddr,
                    constraint: "ETAT<>'AV'",
                    soft_constraint: that.settings.childMod == true ? "ETAT='EN'" : "",
                    question_filter: that.settings.childMod == true ? "cat=1" : ""
                },
                dataType: "jsonp"
            }).done(function(data, textStatus, jqXHR) {
                if (data.completion.indexOf("KO - ") !== -1) {
                    dfd.reject({
                        code: 500,
                        data: data
                    })
                } else {
                    dfd.resolve({
                        data: data
                    })
                }
            }).fail(function(jqXHR, textStatus, errorThrown) {
                dfd.reject({
                    code: errorThrown,
                    data: "in ajax fail function"
                })
            });
            return dfd.promise()
        },
        answer: function(params) {
            var that = this;
            var dfd = new jQuery.Deferred;
            $.ajax({
                url: that.settings.urlApiWs + "/answer",
                data: {
                    session: params.session,
                    signature: params.signature,
                    step: params.step,
                    answer: params.answer,
                    question_filter: that.settings.childMod == true ? "cat=1" : ""
                },
                dataType: "jsonp"
            }).done(function(data, textStatus, jqXHR) {
                if (data.completion.indexOf("KO - ") !== -1) {
                    dfd.reject({
                        code: 500,
                        data: data
                    })
                } else {
                    dfd.resolve({
                        data: data
                    })
                }
            }).fail(function(jqXHR, textStatus, errorThrown) {
                dfd.reject({
                    code: errorThrown,
                    data: "in ajax fail function"
                })
            });
            return dfd.promise()
        },
        cancelAnswer: function(params) {
            var that = this;
            var dfd = new jQuery.Deferred;
            $.ajax({
                url: that.settings.urlApiWs + "/cancel_answer",
                data: {
                    session: params.session,
                    signature: params.signature,
                    step: params.step,
                    answer: -1,
                    question_filter: that.settings.childMod == true ? "cat=1" : ""
                },
                dataType: "jsonp"
            }).done(function(data, textStatus, jqXHR) {
                if (data.completion.indexOf("KO - ") !== -1) {
                    dfd.reject({
                        code: 500,
                        data: data
                    })
                } else {
                    dfd.resolve({
                        data: data
                    })
                }
            }).fail(function(jqXHR, textStatus, errorThrown) {
                dfd.reject({
                    code: errorThrown,
                    data: "in ajax fail function"
                })
            });
            return dfd.promise()
        },
        list: function(params) {
            var that = this;
            var dfd = new jQuery.Deferred;
            $.ajax({
                url: that.settings.urlApiWs + "/list",
                data: {
                    session: params.session,
                    signature: params.signature,
                    step: params.step,
                    size: params.size,
                    max_pic_width: params.max_pic_width,
                    max_pic_height: params.max_pic_height,
                    pref_photos: params.pref_photos,
                    duel_allowed: params.duel_allowed,
                    mode_question: params.mode_question
                },
                dataType: "jsonp"
            }).done(function(data, textStatus, jqXHR) {
                if (data.completion.indexOf("KO - ") !== -1) {
                    dfd.reject({
                        code: 500,
                        data: data
                    })
                } else {
                    dfd.resolve({
                        data: data
                    })
                }
            }).fail(function(jqXHR, textStatus, errorThrown) {
                dfd.reject({
                    code: errorThrown,
                    data: "in ajax fail function"
                })
            });
            return dfd.promise()
        },
        exclude: function(params) {
            var that = this;
            var dfd = new jQuery.Deferred;
            $.ajax({
                url: that.settings.urlApiWs + "/exclusion",
                data: {
                    session: params.session,
                    signature: params.signature,
                    step: params.step,
                    question_filter: that.settings.childMod == true ? "cat=1" : "",
                    forward_answer: params.forward_answer
                },
                dataType: "jsonp"
            }).done(function(data, textStatus, jqXHR) {
                if (data.completion.indexOf("KO - ") !== -1) {
                    dfd.reject({
                        code: 500,
                        data: data
                    })
                } else {
                    dfd.resolve({
                        data: data
                    })
                }
            }).fail(function(jqXHR, textStatus, errorThrown) {
                dfd.reject({
                    code: errorThrown,
                    data: "in ajax fail function"
                })
            });
            return dfd.promise()
        },
        choice: function(params) {
            var that = this;
            var dfd = new jQuery.Deferred;
            $.ajax({
                url: that.settings.urlApiWs + "/choice",
                data: {
                    session: params.session,
                    signature: params.signature,
                    step: params.step,
                    element: params.element,
                    duel_allowed: params.duel_allowed
                },
                dataType: "jsonp"
            }).done(function(data, textStatus, jqXHR) {
                if (data.completion.indexOf("KO - ") !== -1) {
                    dfd.reject({
                        code: 500,
                        data: data
                    })
                } else {
                    dfd.resolve({
                        data: data
                    })
                }
            }).fail(function(jqXHR, textStatus, errorThrown) {
                dfd.reject({
                    code: errorThrown,
                    data: "in ajax fail function"
                })
            });
            return dfd.promise()
        },
        listPhotosVote: function(params) {
            var that = this;
            var dfd = new jQuery.Deferred;
            $.ajax({
                url: that.settings.urlApiWs + "/list_photos_vote",
                data: {
                    objet_id: params.objet_id
                },
                dataType: "jsonp"
            }).done(function(data, textStatus, jqXHR) {
                if (data.completion == "KO - LESS THAN 2 PHOTOS") {
                    dfd.resolve({
                        data: data
                    })
                } else if (data.completion.indexOf("KO - ") !== -1) {
                    dfd.reject({
                        code: 500,
                        data: data
                    })
                } else {
                    dfd.resolve({
                        data: data
                    })
                }
            }).fail(function(jqXHR, textStatus, errorThrown) {
                dfd.reject({
                    code: errorThrown,
                    data: "in ajax fail function"
                })
            });
            return dfd.promise()
        },
        vote: function(params) {
            var that = this;
            var dfd = new jQuery.Deferred;
            $.ajax({
                url: that.settings.urlApiWs + "/vote_photo_web",
                data: {
                    photo_id: params.photo_id,
                    objet_id: params.objet_id
                },
                dataType: "jsonp"
            }).done(function(data, textStatus, jqXHR) {
                if (data.completion == "KO - NOT ALLOWED") {
                    dfd.resolve({
                        data: data
                    })
                } else if (data.completion.indexOf("KO - ") !== -1) {
                    dfd.reject({
                        code: 500,
                        data: data
                    })
                } else {
                    dfd.resolve({
                        data: data
                    })
                }
            }).fail(function(jqXHR, textStatus, errorThrown) {
                dfd.reject({
                    code: errorThrown,
                    data: "in ajax fail function"
                })
            });
            return dfd.promise()
        },
        cancelGame: function(params) {
            var that = this;
            var dfd = new jQuery.Deferred;
            $.ajax({
                url: that.settings.urlApiWs + "/cancel_game",
                data: {
                    session: params.session,
                    signature: params.signature
                },
                dataType: "jsonp"
            }).done(function(data, textStatus, jqXHR) {
                if (data.completion.indexOf("KO - ") !== -1) {
                    dfd.reject({
                        code: 500,
                        data: data
                    })
                } else {
                    dfd.resolve({
                        data: data
                    })
                }
            }).fail(function(jqXHR, textStatus, errorThrown) {
                dfd.reject({
                    code: errorThrown,
                    data: "in ajax fail function"
                })
            });
            return dfd.promise()
        },
        gameReport: function(params) {
            var that = this;
            var dfd = new jQuery.Deferred;
            $.ajax({
                url: that.settings.urlApiWs + "/report",
                data: {
                    session: params.session,
                    signature: params.signature
                },
                dataType: "jsonp"
            }).done(function(data, textStatus, jqXHR) {
                if (data.completion.indexOf("KO - ") !== -1) {
                    dfd.reject({
                        code: 500,
                        data: data
                    })
                } else {
                    dfd.resolve({
                        data: data
                    })
                }
            }).fail(function(jqXHR, textStatus, errorThrown) {
                dfd.reject({
                    code: errorThrown,
                    data: "in ajax fail function"
                })
            });
            return dfd.promise()
        },
        searchQuestion: function(params) {
            var that = this;
            var dfd = new jQuery.Deferred;
            $.ajax({
                url: that.settings.urlApiWs + "/search_question",
                data: {
                    session: params.session,
                    signature: params.signature,
                    search: params.search
                },
                dataType: "jsonp"
            }).done(function(data, textStatus, jqXHR) {
                if (data.completion.indexOf("KO - ") !== -1) {
                    dfd.reject({
                        code: 500,
                        data: data
                    })
                } else {
                    dfd.resolve({
                        data: data
                    })
                }
            }).fail(function(jqXHR, textStatus, errorThrown) {
                dfd.reject({
                    code: errorThrown,
                    data: "in ajax fail function"
                })
            });
            return dfd.promise()
        },
        addQuestion: function(params) {
            var that = this;
            var dfd = new jQuery.Deferred;
            $.ajax({
                url: that.settings.urlApiWs + "/add_question",
                data: {
                    session: params.session,
                    signature: params.signature,
                    question: params.question,
                    player: params.player,
                    answers: params.answers,
                    num_question: params.num_question
                },
                dataType: "jsonp"
            }).done(function(data, textStatus, jqXHR) {
                if (data.completion.indexOf("KO - ") !== -1) {
                    dfd.reject({
                        code: 500,
                        data: data
                    })
                } else {
                    dfd.resolve({
                        data: data
                    })
                }
            }).fail(function(jqXHR, textStatus, errorThrown) {
                dfd.reject({
                    code: errorThrown,
                    data: "in ajax fail function"
                })
            });
            return dfd.promise()
        },
        correctionName: function(params) {
            var that = this;
            var dfd = new jQuery.Deferred;
            $.ajax({
                url: that.settings.urlApiWs + "/signaler_nom_incorrect",
                data: {
                    objet_id: params.objet_id,
                    nouveau_nom: params.nouveau_nom,
                    nouvelle_desc: params.nouvelle_desc,
                    ancien_nom: params.ancien_nom,
                    ancienne_desc: params.ancienne_desc,
                    commentaire: params.commentaire
                },
                dataType: "jsonp"
            }).done(function(data, textStatus, jqXHR) {
                if (data.completion.indexOf("KO - ") !== -1) {
                    if (data.completion == "KO - RENAME STILL UNDER VALIDATION") {
                        dfd.resolve({
                            data: data
                        })
                    } else {
                        dfd.reject({
                            code: 500,
                            data: data
                        })
                    }
                } else {
                    dfd.resolve({
                        data: data
                    })
                }
            }).fail(function(jqXHR, textStatus, errorThrown) {
                dfd.reject({
                    code: errorThrown,
                    data: "in ajax fail function"
                })
            });
            return dfd.promise()
        },
        soundlikeSearch: function(params) {
            var that = this;
            var dfd = new jQuery.Deferred;
            $.ajax({
                url: that.settings.urlApiWs + "/soundlike_search",
                data: {
                    session: params.session,
                    signature: params.signature,
                    step: params.step,
                    name: params.name,
                    contrainte: params.contrainte
                },
                dataType: "jsonp"
            }).done(function(data, textStatus, jqXHR) {
                if (data.completion.indexOf("KO - ") !== -1) {
                    dfd.reject({
                        code: 500,
                        data: data
                    })
                } else if (data.completion.indexOf("WARN - ") !== -1) {
                    dfd.reject({
                        code: 500,
                        data: data
                    })
                } else {
                    dfd.resolve({
                        data: data
                    })
                }
            }).fail(function(jqXHR, textStatus, errorThrown) {
                dfd.reject({
                    code: errorThrown,
                    data: "in ajax fail function"
                })
            });
            return dfd.promise()
        },
        soundlikeAcceptance: function(params) {
            var that = this;
            var dfd = new jQuery.Deferred;
            $.ajax({
                url: that.settings.urlApiWs + "/soundlike_acceptance",
                data: {
                    session: params.session,
                    signature: params.signature,
                    number: params.number
                },
                dataType: "jsonp"
            }).done(function(data, textStatus, jqXHR) {
                if (data.completion.indexOf("KO - ") !== -1) {
                    dfd.reject({
                        code: 500,
                        data: data
                    })
                } else {
                    dfd.resolve({
                        data: data
                    })
                }
            }).fail(function(jqXHR, textStatus, errorThrown) {
                dfd.reject({
                    code: errorThrown,
                    data: "in ajax fail function"
                })
            });
            return dfd.promise()
        },
        sendDuplicate: function(params) {
            var that = this;
            var dfd = new jQuery.Deferred;
            $.ajax({
                url: that.settings.urlApiWs + "/signaler_doublon",
                data: {
                    ids_doublons: params.ids_doublons,
                    org: params.org
                },
                dataType: "jsonp"
            }).done(function(data, textStatus, jqXHR) {
                if (data.completion.indexOf("KO - ") !== -1) {
                    dfd.reject({
                        code: 500,
                        data: data
                    })
                } else {
                    dfd.resolve({
                        data: data
                    })
                }
            }).fail(function(jqXHR, textStatus, errorThrown) {
                dfd.reject({
                    code: errorThrown,
                    data: "in ajax fail function"
                })
            });
            return dfd.promise()
        },
        newElement: function(params) {
            var that = this;
            var dfd = new jQuery.Deferred;
            $.ajax({
                url: that.settings.urlApiWs + "/new_element",
                data: {
                    session: params.session,
                    signature: params.signature,
                    name: params.name,
                    description: params.description
                },
                dataType: "jsonp"
            }).done(function(data, textStatus, jqXHR) {
                if (data.completion.indexOf("KO - ") !== -1) {
                    dfd.reject({
                        code: 500,
                        data: data
                    })
                } else {
                    dfd.resolve({
                        data: data
                    })
                }
            }).fail(function(jqXHR, textStatus, errorThrown) {
                dfd.reject({
                    code: errorThrown,
                    data: "in ajax fail function"
                })
            });
            return dfd.promise()
        }
    });
    $.fn[pluginName] = function(options) {
        return this.each(function() {
            if (!$.data(this, "plugin_" + pluginName)) {
                $.data(this, "plugin_" + pluginName, new Plugin(this, options))
            }
        })
    }
})(jQuery, window, document);
$(document).ready(function() {
    var apiLimuleClient = {};

    function showError() {
        $.ajax({
            url: Routing.generate("technical_error")
        }).done(function(data, textStatus, jqXHR) {
            $("div#game_content").html(data);
            $("div#game_content").find("div#div-overlay").addClass("hidden");
            $("div#game_content").find("div.col-md-4").removeClass("overlayed");
            $("div#game_content").find("div.col-md-8").removeClass("overlayed");
            $("div#game_content").find("div.col-md-10").removeClass("overlayed");
            $("div#game_content").find("div.col-md-12").removeClass("overlayed");
            triggerUiAnimation()
        })
    }

    function triggerUiAnimation() {
        generate_question_bubble($(".bubble-question.bubble"), 0);
        generate_propose_bubble($(".bubble-propose.bubble"), 0);
        generate_standard_bubble($(".bubble-standard.bubble"), 0);
        animCheckboxes();
        animMenuOverInGame();
        animPlay();
        animGameReport();
        $("div#game_content").find("div.overlayed").removeClass("overlayed");
        $("div#div-overlay").hide()
    }

    function showOverlayLoading() {
        $("div#div-overlay").show();
        $("div#game_content").find("div.row").find("div.col-md-4").addClass("overlayed");
        $("div#game_content").find("div.row").find("div.col-md-8").addClass("overlayed");
        $("div#game_content").find("div.row").find("div.col-md-10").addClass("overlayed");
        $("div#game_content").find("div.row").find("div.col-md-12").addClass("overlayed");
        $("div#page-formulaire").addClass("overlayed")
    }

    function isAbleToFind() {
        if ($.elokWrapperStorage.get("gameData").step - $.elokWrapperStorage.get("gameData").stepOfLastProp < $.elokWrapperStorage.get("constraints").ecart_question_entre_prop) {
            return false
        } else {
            if ($.elokWrapperStorage.get("gameData").progression > $.elokWrapperStorage.get("constraints").pourcentage_list || $.elokWrapperStorage.get("gameData").step - $.elokWrapperStorage.get("gameData").stepOfLastProp == $.elokWrapperStorage.get("constraints").questions_max_avant_prop) {
                if ($.elokWrapperStorage.get("gameData").step == 75) {
                    return false
                } else {
                    return true
                }
            } else {
                return false
            }
        }
    }

    function changeAkitude(callback, name) {
        var prefixe = "/bundles/elokencesite/images/akitudes_670x1096/";
        var image = document.querySelectorAll(".akinator-body img")[0];
        var downloadingImage = new Image;
        downloadingImage.onload = function() {
            image.src = this.src;
            $("div.akinator-body").removeClass("hidden");
            if (typeof callback == "function") {
                callback()
            }
        };
        if (name != "" && name != null) {
            downloadingImage.src = "https://" + window.location.hostname + prefixe + name + ".png"
        } else {
            downloadingImage.src = "https://" + window.location.hostname + prefixe + getAkitude()
        }
    }

    function getAkitude() {
        var trouvitude = $.elokWrapperStorage.get("gameData").progression;
        var oldTrouvitude = $.elokWrapperStorage.get("gameData").oldprogression;
        var step = $.elokWrapperStorage.get("gameData").step;
        var trouvitudeCible = step * 4;
        if (step <= 10) trouvitudePonderee = (step * trouvitude + (10 - step) * trouvitudeCible) / 10;
        else trouvitudePonderee = 0;
        if (trouvitude >= 80) return "mobile.png";
        if (oldTrouvitude < 50 && trouvitude >= 50) return "inspiration_forte.png";
        if (trouvitude >= 50) return "confiant.png";
        if (oldTrouvitude - trouvitude > 16) return "surprise.png";
        if (oldTrouvitude - trouvitude > 8) return "etonnement.png";
        if (trouvitudePonderee >= trouvitudeCible) return "inspiration_legere.png";
        if (trouvitudePonderee >= trouvitudeCible * .8) return "serein.png";
        if (trouvitudePonderee >= trouvitudeCible * .6) return "concentration_intense.png";
        if (trouvitudePonderee >= trouvitudeCible * .4) return "leger_decouragement.png";
        if (trouvitudePonderee >= trouvitudeCible * .2) return "tension.png";
        return "vrai_decouragement.png"
    }

    function clearGameData() {
        var gameData = new Object;
        $.elokWrapperStorage.set("gameData", gameData);
        $.elokWrapperStorage.deleteKey("gameActions");
        $.elokWrapperStorage.deleteKey("idQuestionSelected")
    }

    function allowChildFilterChange() {
        $("div.mode-enfant").removeClass("disabled");
        $("div.mode-enfant>input").removeClass("disabled");
        $("#tgl-enfant").off("click");
        $("#tgl-enfant").on("click", function(event) {
            if ($(this).is(":checked")) {
                $.elokWrapperStorage.set("childFilter", true);
                $("div.mode-enfant").find("label.tgl-btn").removeClass("child-mod-deactivated");
                $("div.mode-enfant").find("div.background").removeClass("child-mod-deactivated")
            } else {
                $.elokWrapperStorage.set("childFilter", false);
                $("div.mode-enfant").find("label.tgl-btn").addClass("child-mod-deactivated");
                $("div.mode-enfant").find("div.background").addClass("child-mod-deactivated")
            }
        })
    }

    function disallowChildFilterChange() {
        $("div.mode-enfant").addClass("disabled");
        $("div.mode-enfant>input").addClass("disabled");
        $("#tgl-enfant").on("click", function(event) {
            event.preventDefault()
        })
    }

    function newSession() {
        clearGameData();
        disallowChildFilterChange();
        var arrUrlThemesToPlay = $.elokWrapperStorage.get("arrUrlThemesToPlay");
        if (typeof arrUrlThemesToPlay == "undefined" || arrUrlThemesToPlay == null) {
            window.location.href = Routing.generate("home")
        }
        var urlToPlay = "";
        if (arrUrlThemesToPlay.length > 1) {
            urlToPlay = $.elokWrapperStorage.get("urlToPlay")
        } else {
            urlToPlay = arrUrlThemesToPlay[0].urlWs;
            $.elokWrapperStorage.set("urlToPlay", urlToPlay)
        }
        if (urlToPlay == null) {
            window.location.href = Routing.generate("home")
        }
        apiLimuleClient = $("body").apiLimuleClient({
            urlApiWs: urlToPlay,
            partner: 1,
            uid_ext_session: uid_ext_session,
            frontaddr: frontaddr,
            childMod: $.elokWrapperStorage.get("childFilter")
        }).data("plugin_apiLimuleClient");
        $.when($.ajax({
            url: Routing.generate("new_session"),
            dataType: "jsonp",
            data: {
                urlApiWs: urlToPlay,
                player: "website-desktop",
                partner: 1,
                uid_ext_session: uid_ext_session,
                frontaddr: frontaddr,
                childMod: $.elokWrapperStorage.get("childFilter"),
                constraint: "ETAT<>'AV'",
                soft_constraint: $.elokWrapperStorage.get("childFilter") === true ? "ETAT='EN'" : "",
                question_filter: $.elokWrapperStorage.get("childFilter") === true ? "cat=1" : ""
            }
        }), $.ajax({
            url: Routing.generate("answer")
        })).then(function(newSessionResult2, answerHtmlResult) {
            var newSessionResult = {
                data: newSessionResult2[0]
            };
            var answerHtml = $.parseHTML(answerHtmlResult[0]);
            $(answerHtml).find("p.question-number").html(parseInt(newSessionResult.data.parameters.step_information.step) + 1);
            $(answerHtml).find("p.question-text").html(newSessionResult.data.parameters.step_information.question);
            $(answerHtml).find("a#a_yes").html(newSessionResult.data.parameters.step_information.answers[0].answer);
            $(answerHtml).find("a#a_no").html(newSessionResult.data.parameters.step_information.answers[1].answer);
            $(answerHtml).find("a#a_dont_know").html(newSessionResult.data.parameters.step_information.answers[2].answer);
            $(answerHtml).find("a#a_probably").html(newSessionResult.data.parameters.step_information.answers[3].answer);
            $(answerHtml).find("a#a_probaly_not").html(newSessionResult.data.parameters.step_information.answers[4].answer);
            $(answerHtml).find("div.back-button").remove();
            $("div#game_content").html(answerHtml);
            var gameData = new Object;
            gameData.signature = newSessionResult.data.parameters.identification.signature;
            gameData.session = newSessionResult.data.parameters.identification.session;
            gameData.step = newSessionResult.data.parameters.step_information.step;
            gameData.stepOfLastProp = "0";
            gameData.progression = "0";
            $.elokWrapperStorage.set("gameData", gameData);
            $("div#game_content").find("div.akinator-body").removeClass("hidden");
            triggerUiAnimation()
        }, function(responseResult) {
            var json = JSON.parse(responseResult.responseText);
            if (typeof json.url !== "undefined") {
                window.location.href = json.url
            }
            showError();
            $("div#game_content").off("click", "a#a_retry");
            $("div#game_content").on("click", "a#a_retry", function() {
                newSession()
            })
        })
    }

    function answer(answerIndex) {
        showOverlayLoading();
        var gameData = $.elokWrapperStorage.get("gameData");
        $.when($.ajax({
            url: Routing.generate("answer_api"),
            dataType: "jsonp",
            data: {
                urlApiWs: $.elokWrapperStorage.get("urlToPlay"),
                session: gameData.session,
                signature: gameData.signature,
                step: gameData.step,
                frontaddr: frontaddr,
                answer: answerIndex,
                question_filter: $.elokWrapperStorage.get("childFilter") === true ? "cat=1" : ""
            }
        }), $.ajax({
            url: Routing.generate("answer")
        })).then(function(answerResult2, answerHtmlResult) {
            var answerResult = {
                data: answerResult2[0]
            };
            gameData.step = answerResult.data.parameters.step;
            gameData.oldprogression = gameData.progression;
            gameData.progression = answerResult.data.parameters.progression;
            gameData.completion = answerResult.data.completion;
            $.elokWrapperStorage.set("gameData", gameData);
            if (isAbleToFind() == true || answerResult.data.completion == "WARN - NO QUESTION") {
                gameData.stepOfLastProp = gameData.step;
                $.elokWrapperStorage.set("gameData", gameData);
                $("body").trigger("propose")
            } else {
                var answerHtml = $.parseHTML(answerHtmlResult[0]);
                $(answerHtml).find("p.question-number").html(parseInt(answerResult.data.parameters.step) + 1);
                $(answerHtml).find("p.question-text").html(answerResult.data.parameters.question);
                $(answerHtml).find("a#a_yes").html(answerResult.data.parameters.answers[0].answer);
                $(answerHtml).find("a#a_no").html(answerResult.data.parameters.answers[1].answer);
                $(answerHtml).find("a#a_dont_know").html(answerResult.data.parameters.answers[2].answer);
                $(answerHtml).find("a#a_probably").html(answerResult.data.parameters.answers[3].answer);
                $(answerHtml).find("a#a_probaly_not").html(answerResult.data.parameters.answers[4].answer);
                $("div#game_content").html(answerHtml);
                changeAkitude(function() {
                    triggerUiAnimation()
                })
            }
        }, function() {
            showError();
            $("div#game_content").off("click", "a#a_retry");
            $("div#game_content").on("click", "a#a_retry", function() {
                answer(answerIndex)
            })
        })
    }

    function cancelAnswer() {
        showOverlayLoading();
        var gameData = $.elokWrapperStorage.get("gameData");
        $.when(apiLimuleClient.cancelAnswer({
            session: gameData.session,
            signature: gameData.signature,
            step: gameData.step
        }), $.ajax({
            url: Routing.generate("answer")
        })).then(function(cancelAnswerResult, answerHtmlResult) {
            var answerHtml = $.parseHTML(answerHtmlResult[0]);
            $(answerHtml).find("p.question-number").html(parseInt(cancelAnswerResult.data.parameters.step) + 1);
            $(answerHtml).find("p.question-text").html(cancelAnswerResult.data.parameters.question);
            $(answerHtml).find("a#a_yes").html(cancelAnswerResult.data.parameters.answers[0].answer);
            $(answerHtml).find("a#a_no").html(cancelAnswerResult.data.parameters.answers[1].answer);
            $(answerHtml).find("a#a_dont_know").html(cancelAnswerResult.data.parameters.answers[2].answer);
            $(answerHtml).find("a#a_probably").html(cancelAnswerResult.data.parameters.answers[3].answer);
            $(answerHtml).find("a#a_probaly_not").html(cancelAnswerResult.data.parameters.answers[4].answer);
            if (gameData.step == 1) {
                $(answerHtml).find("div.back-button").remove()
            }
            $("div#game_content").html(answerHtml);
            gameData.step = cancelAnswerResult.data.parameters.step;
            gameData.progression = cancelAnswerResult.data.parameters.progression;
            $.elokWrapperStorage.set("gameData", gameData);
            changeAkitude(function() {
                triggerUiAnimation()
            })
        }, function() {
            showError();
            $("div#game_content").off("click", "a#a_retry");
            $("div#game_content").on("click", "a#a_retry", function() {
                cancelAnswer()
            })
        })
    }

    function propose() {
        showOverlayLoading();
        var gameData = $.elokWrapperStorage.get("gameData");
        $.when(apiLimuleClient.list({
            session: gameData.session,
            signature: gameData.signature,
            step: gameData.step,
            size: 2,
            max_pic_width: $.elokWrapperStorage.get("constraints").width_max_photo,
            max_pic_height: $.elokWrapperStorage.get("constraints").height_max_photo,
            pref_photos: "VO-OK",
            duel_allowed: 1,
            mode_question: 0
        }), $.ajax({
            url: Routing.generate("list")
        })).then(function(listResult, listHtmlResult) {
            if (listResult.data.parameters.elements[0].element.valide_contrainte == "0") {
                $.ajax({
                    url: Routing.generate("not_for_children")
                }).done(function(data, textStatus, jqXHR) {
                    $("div#game_content").html(data);
                    $("div#game_content").find("div.akinator-body").removeClass("hidden");
                    allowChildFilterChange();
                    triggerUiAnimation()
                }).fail(function(jqXHR, textStatus, errorThrown) {
                    showError();
                    $("div#game_content").off("click", "a#a_retry");
                    $("div#game_content").on("click", "a#a_retry", function() {
                        propose()
                    })
                })
            } else {
                var listHtml = $.parseHTML(listHtmlResult[0]);
                $(listHtml).find("span.proposal-title").html(listResult.data.parameters.elements[0].element.name);
                $(listHtml).find("span.proposal-subtitle").html(listResult.data.parameters.elements[0].element.description);
                $(listHtml).find("div#img_character").html('<img src="' + listResult.data.parameters.elements[0].element.absolute_picture_path + '" alt="' + listResult.data.parameters.elements[0].element.name + '"/>');
                $(listHtml).find("span#privacy_copyright>a").attr("href", "http://www.akinator.com/ippolicy.php?name=" + encodeURIComponent(listResult.data.parameters.elements[0].element.name.replace(/\//g, "-")) + "&id=" + listResult.data.parameters.elements[0].element.id_base);
                if (typeof listResult.data.parameters.elements[0].element.pseudo != "undefined" && listResult.data.parameters.elements[0].element.pseudo != "" && listResult.data.parameters.elements[0].element.pseudo != "none") {
                    $(listHtml).find("span#proposed_by").append(listResult.data.parameters.elements[0].element.pseudo)
                } else {
                    $(listHtml).find("span#proposed_by").remove()
                }
                $("div#game_content").html(listHtml);
                $("div#game_content").find("div.akinator-body").removeClass("hidden");
                triggerUiAnimation();
                gameData.id = listResult.data.parameters.elements[0].element.id;
                gameData.id_base = listResult.data.parameters.elements[0].element.id_base;
                gameData.nom = listResult.data.parameters.elements[0].element.name;
                gameData.description = listResult.data.parameters.elements[0].element.description;
                gameData.flag_photo = listResult.data.parameters.elements[0].element.flag_photo;
                gameData.nb_elements = listResult.data.parameters.elements.length;
                $.elokWrapperStorage.set("gameData", gameData)
            }
        }, function() {
            showError();
            $("div#game_content").off("click", "a#a_retry");
            $("div#game_content").on("click", "a#a_retry", function() {
                propose()
            })
        })
    }

    function listPhotosVote() {
        var gameData = $.elokWrapperStorage.get("gameData");
        $.when(apiLimuleClient.listPhotosVote({
            objet_id: gameData.id_base
        }), $.ajax({
            url: Routing.generate("picture_fight")
        })).then(function(duelResult, duelHtmlResult) {
            if (duelResult.data.completion == "KO - LESS THAN 2 PHOTOS") {
                callChoice()
            } else {
                var duelHtml = $.parseHTML(duelHtmlResult[0]);
                $(duelHtml).find("div#photo_champion").prepend('<img src="' + duelResult.data.PHOTOS[0].PHOTO.URL + '" width="300" />');
                $(duelHtml).find("div#photo_challenger").prepend('<img src="' + duelResult.data.PHOTOS[1].PHOTO.URL + '" width="300" />');
                $(duelHtml).find("input#vote_champion").data("id", duelResult.data.PHOTOS[0].PHOTO.ID);
                $(duelHtml).find("input#vote_challenger").data("id", duelResult.data.PHOTOS[1].PHOTO.ID);
                if (duelResult.data.PHOTOS[0].PHOTO.PSEUDO !== null) {
                    $(duelHtml).find("span#pseudo_photo_champion").html(duelResult.data.PHOTOS[0].PHOTO.PSEUDO)
                } else {
                    $(duelHtml).find("span#pseudo_photo_champion").parent("div").html("&nbsp;")
                }
                if (duelResult.data.PHOTOS[1].PHOTO.PSEUDO !== null) {
                    $(duelHtml).find("span#pseudo_photo_challenger").html(duelResult.data.PHOTOS[1].PHOTO.PSEUDO)
                } else {
                    $(duelHtml).find("span#pseudo_photo_challenger").parent("div").html("&nbsp;")
                }
                $(duelHtml).find("div#current_votes_champion").html(duelResult.data.PHOTOS[0].PHOTO.NB_VOTES + "&nbsp;" + Translator.trans("VOTES"));
                $(duelHtml).find("div#current_votes_challenger").html(duelResult.data.PHOTOS[1].PHOTO.NB_VOTES + "&nbsp;" + Translator.trans("VOTES"));
                $("div#game_content").html(duelHtml);
                triggerUiAnimation()
            }
        }, function() {
            showError();
            $("div#game_content").off("click", "a#a_retry");
            $("div#game_content").on("click", "a#a_retry", function() {
                listPhotosVote()
            })
        })
    }

    function callChoice() {
        showOverlayLoading();
        var gameData = $.elokWrapperStorage.get("gameData");
        $.when(apiLimuleClient.choice({
            session: gameData.session,
            signature: gameData.signature,
            step: gameData.step,
            element: gameData.id,
            duel_allowed: 1
        }), $.ajax({
            url: Routing.generate("end_game")
        })).then(function(choiceResult, choiceHtmlResult) {
            gameData.nbFois = choiceResult.data.parameters.element_informations.times_selected;
            gameData.lastTime = choiceResult.data.parameters.element_informations.previous;
            gameData.status_filtre_contributions = choiceResult.data.parameters.element_informations.status_filtre_contributions;
            $.elokWrapperStorage.set("gameData", gameData);
            showChoiceData(choiceHtmlResult)
        }, function() {
            showError();
            $("div#game_content").off("click", "a#a_retry");
            $("div#game_content").on("click", "a#a_retry", function() {
                callChoice()
            })
        })
    }

    function callChoiceLostGame() {
        showOverlayLoading();
        var gameData = $.elokWrapperStorage.get("gameData");
        $.when(apiLimuleClient.choice({
            session: gameData.session,
            signature: gameData.signature,
            step: gameData.step,
            element: gameData.id,
            duel_allowed: 1
        }), $.ajax({
            url: Routing.generate("end_game_akinator_lost")
        })).then(function(choiceResult, endGameHtmlResult) {
            gameData.nbFois = choiceResult.data.parameters.element_informations.times_selected;
            gameData.lastTime = choiceResult.data.parameters.element_informations.previous;
            gameData.status_filtre_contributions = choiceResult.data.parameters.element_informations.status_filtre_contributions;
            $.elokWrapperStorage.set("gameData", gameData);
            showChoiceData(endGameHtmlResult);
            changeAkitude(function() {
                triggerUiAnimation()
            }, "deception")
        }, function() {
            showError();
            $("div#game_content").off("click", "a#a_retry");
            $("div#game_content").on("click", "a#a_retry", function() {
                callChoiceLostGame()
            })
        })
    }

    function showChoiceData(choiceHtmlResult, optionalMessage) {
        var gameData = $.elokWrapperStorage.get("gameData");
        var choiceHtml = new Object;
        if (typeof choiceHtmlResult == "object") {
            choiceHtml = $.parseHTML(choiceHtmlResult[0])
        } else {
            choiceHtml = $.parseHTML(choiceHtmlResult)
        }
        $(choiceHtml).find("span.win-title").html(gameData.nom);
        $(choiceHtml).find("span.win-subtitle").html(gameData.description);
        var themeID = $.elokWrapperStorage.get("subjectId");
        var tokenDejaJoue = Translator.trans("PERSONNAGE_DEJA_JOUE");
        if (parseInt(themeID) === 2) {
            tokenDejaJoue = Translator.trans("OBJET_DEJA_JOUE")
        }
        if (parseInt(themeID) === 14) {
            tokenDejaJoue = Translator.trans("ANIMAL_DEJA_JOUE")
        }
        $(choiceHtml).find("div.bubble-win>p").append('<span class="win-subtitle last-played">' + tokenDejaJoue + "&nbsp;" + gameData.nbFois + "&nbsp;" + Translator.trans("FOIS") + "</span>").append('<span class="win-subtitle">' + Translator.trans("JOUE_PRECEDEMMENT_LE") + "&nbsp;" + gameData.lastTime + "</span>");
        if (gameData.flag_photo == 0) {
            $(choiceHtml).find("a#a_propose_photo").parent("li").remove()
        }
        if (gameData.flag_photo == 1) {
            $(choiceHtml).find("a#a_propose_photo").parent("li").remove();
            $("div#customModal").find("div.modal-body").append("<p>" + Translator.trans("IMAGE_EN_COURS_DE_VALIDATION") + "</p>");
            $("div#game_content").off("click", "a#a_add_photo");
            $("div#game_content").on("click", "a#a_add_photo", function(event) {
                event.preventDefault();
                $("#customModal").modal()
            })
        }
        if (gameData.flag_photo == 2) {
            $(choiceHtml).find("a#a_add_photo").parent("li").remove()
        }
        if (gameData.flag_photo == 3 || gameData.flag_photo == 4) {
            $(choiceHtml).find("a#a_add_photo").parent("li").remove();
            $("div#customModal").find("div.modal-body").append("<p>" + Translator.trans("IMAGE_EN_COURS_DE_VALIDATION") + "</p>");
            $("div#game_content").off("click", "a#a_propose_photo");
            $("div#game_content").on("click", "a#a_propose_photo", function(event) {
                event.preventDefault();
                $("#customModal").modal()
            })
        }
        if (gameData.flag_photo == 5) {
            $(choiceHtml).find("a#a_add_photo").parent("li").remove();
            $(choiceHtml).find("a#a_propose_photo").parent("li").remove()
        }
        if (gameData.status_filtre_contributions == 0) {
            $(choiceHtml).find("a#a_add_question").parent("li").remove();
            $(choiceHtml).find("a#a_add_photo").parent("li").remove();
            $(choiceHtml).find("a#a_propose_photo").parent("li").remove();
            $(choiceHtml).find("a#a_correction_name").parent("li").remove();
            $(choiceHtml).find("a#a_search_question").parent("li").remove()
        }
        if (gameData.status_filtre_contributions == 1) {
            $(choiceHtml).find("a#a_search_question").parent("li").remove();
            $(choiceHtml).find("a#a_add_question").parent("li").remove()
        }
        $(choiceHtml).find("ul.social-network").find("a.icoFacebook").attr("href", "http://www.facebook.com/dialog/feed?app_id=816000808484297&link=http://www.akinator.com/&picture=http://en.akinator.com/imgs/lampeWho.png&name=" + encodeURIComponent(Translator.trans("AKINATOR_VIENS_DE_DEVINER_QUE_JE_PENSAIS_A") + " " + gameData.nom) + "&caption=" + encodeURIComponent(Translator.trans("AKINATOR_LE_GENIE_DU_WEB_QUI_LIT_DANS_VOS_PENSEES")) + "&description=" + encodeURIComponent(Translator.trans("PENSEZ_A_UN_PERSONNAGE_REEL_OU_FICTIF") + ". " + Translator.trans("JE_VAIS_TENTER_DE_LE_DEVINER") + ".") + "&redirect_uri=http://www.akinator.com");
        $(choiceHtml).find("ul.social-network").find("a.icoTwitter").attr("href", "http://twitter.com/share?via=akinator_team&amp;url=http%3A%2F%2Fwww.akinator.com%2F&amp;text=" + encodeURIComponent(Translator.trans("AKINATOR_VIENS_DE_DEVINER_QUE_JE_PENSAIS_A") + " " + gameData.nom));
        $(choiceHtml).find("p.success").removeClass("hidden").html(optionalMessage);
        $(choiceHtml).find("ul.win-menu").removeClass("hidden");
        $("div#game_content").html(choiceHtml);
        if (typeof googletag.pubads !== "undefined") {
            googletag.pubads().refresh()
        }
        triggerUiAnimation();
        allowChildFilterChange()
    }

    function votePhoto(event) {
        showOverlayLoading();
        var gameData = $.elokWrapperStorage.get("gameData");
        $.when(apiLimuleClient.vote({
            photo_id: $(event.currentTarget).data("id"),
            objet_id: gameData.id_base
        }), $.ajax({
            url: Routing.generate("picture_vote")
        })).then(function(voteResult, voteHtmlResult) {
            if (voteResult.data.completion == "KO - NOT ALLOWED") {
                $.ajax({
                    url: Routing.generate("picture_already_voted")
                }).done(function(data, textStatus, jqXHR) {
                    var resultHtml = $.parseHTML(data);
                    var subjectId = $.elokWrapperStorage.get("subjectId");
                    if (subjectId != null && $.elokWrapperStorage.get("subjectId") == 2) {
                        $(resultHtml).find("span.proposal-title").html(Translator.trans("DEJA_VOTE_OBJET"))
                    }
                    $("div#game_content").html(resultHtml);
                    $("div#game_content").find("div.akinator-body").removeClass("hidden");
                    triggerUiAnimation()
                }).fail(function(jqXHR, textStatus, errorThrown) {
                    showError();
                    $("div#game_content").off("click", "a#a_retry");
                    $("div#game_content").on("click", "a#a_retry", function() {
                        votePhoto(event)
                    })
                })
            } else {
                $.ajax({
                    url: Routing.generate("picture_vote")
                }).done(function(data, textStatus, jqXHR) {
                    $("div#game_content").html(data);
                    $("div.akinator-body").removeClass("hidden");
                    triggerUiAnimation()
                }).fail(function(jqXHR, textStatus, errorThrown) {
                    showError();
                    $("div#game_content").off("click", "a#a_retry");
                    $("div#game_content").on("click", "a#a_retry", function() {
                        votePhoto(event)
                    })
                })
            }
        }, function() {
            showError();
            $("div#game_content").off("click", "a#a_retry");
            $("div#game_content").on("click", "a#a_retry", function() {
                votePhoto(event)
            })
        })
    }

    function exclude() {
        showOverlayLoading();
        var gameData = $.elokWrapperStorage.get("gameData");
        $.when(apiLimuleClient.exclude({
            session: gameData.session,
            signature: gameData.signature,
            step: gameData.step,
            forward_answer: 1
        }), $.ajax({
            url: Routing.generate("answer")
        })).then(function(excludeResult, answerHtmlResult) {
            var answerHtml = $.parseHTML(answerHtmlResult[0]);
            $(answerHtml).find("p.question-number").html(parseInt(excludeResult.data.parameters.step) + 1);
            $(answerHtml).find("p.question-text").html(excludeResult.data.parameters.question);
            $(answerHtml).find("a#a_yes").html(excludeResult.data.parameters.answers[0].answer);
            $(answerHtml).find("a#a_no").html(excludeResult.data.parameters.answers[1].answer);
            $(answerHtml).find("a#a_dont_know").html(excludeResult.data.parameters.answers[2].answer);
            $(answerHtml).find("a#a_probably").html(excludeResult.data.parameters.answers[3].answer);
            $(answerHtml).find("a#a_probaly_not").html(excludeResult.data.parameters.answers[4].answer);
            $("div#game_content").html(answerHtml);
            gameData.step = excludeResult.data.parameters.step;
            gameData.progression = excludeResult.data.parameters.progression;
            $.elokWrapperStorage.set("gameData", gameData);
            changeAkitude(function() {
                triggerUiAnimation()
            })
        }, function() {
            showError();
            $("div#game_content").off("click", "a#a_retry");
            $("div#game_content").on("click", "a#a_retry", function() {
                exclude()
            })
        })
    }

    function gameReport() {
        showOverlayLoading();
        var gameData = $.elokWrapperStorage.get("gameData");
        $.when(apiLimuleClient.gameReport({
            session: gameData.session,
            signature: gameData.signature
        }), $.ajax({
            url: Routing.generate("game_report")
        })).then(function(reportResult, reportHtmlResult) {
            var reportHtml = $.parseHTML(reportHtmlResult[0]);
            $(reportHtml).find("span#report_perso_name").html(reportResult.data.parameters.name);
            var table = $(reportHtml).find("tbody");
            $.each(reportResult.data.parameters.steps, function(index, item) {
                var classAnswer = item.step.expected_answer == item.step.given_answer ? "good-answer" : "wrong-answer";
                table.append('<tr><td><p class="question">' + item.step.question + '</p></td>\n                    <td><p class="given-answer">' + item.step.given_answer + '</p></td>\n                    <td><p class="' + classAnswer + '">' + item.step.expected_answer + "</p></td></tr>")
            });
            $("div#game_content").html(reportHtml);
            triggerUiAnimation()
        }, function() {
            showError();
            $("div#game_content").off("click", "a#a_retry");
            $("div#game_content").on("click", "a#a_retry", function() {
                gameReport()
            })
        })
    }

    function showSoundlikeSearch() {
        showOverlayLoading();
        $.ajax({
            url: Routing.generate("soundlike_search")
        }).done(function(data, textStatus, jqXHR) {
            $("div#game_content").html(data);
            triggerUiAnimation()
        }).fail(function(jqXHR, textStatus, errorThrown) {
            showError();
            $("div#game_content").off("click", "a#a_retry");
            $("div#game_content").on("click", "a#a_retry", function() {
                showSoundlikeSearch()
            })
        })
    }

    function soundlikeSearch(name) {
        showOverlayLoading();
        var gameData = $.elokWrapperStorage.get("gameData");
        var childMode = $.elokWrapperStorage.get("childFilter");
        var par = "etat='EN'";
        $.when(apiLimuleClient.soundlikeSearch({
            session: gameData.session,
            signature: gameData.signature,
            step: gameData.step,
            name: name,
            contrainte: childMode === true ? par : ""
        }), $.ajax({
            url: Routing.generate("soundlike_list")
        })).then(function(soundlikeSearchResult, soundlikeListHtmlResult) {
            if (soundlikeSearchResult.data.completion == "OK - NO SOUNDLIKE") {
                showSoundlikeAddCharacter()
            } else {
                var soundlikeListHtml = $.parseHTML(soundlikeListHtmlResult[0]);
                var table = $(soundlikeListHtml).find("table.custom-table>tbody");
                $.each(soundlikeSearchResult.data.parameters.soundlikes, function(index, item) {
                    var tr = table.find("tr").first().clone();
                    tr.find("a").prop("data-id", item.element.id_base).prop("id", index).html(item.element.name + " (" + item.element.description + ")");
                    tr.removeClass("hidden");
                    tr.find("label").prop("for", item.element.id_base);
                    tr.find('input[type="checkbox"]').prop("id", item.element.id_base);
                    tr.find('input[type="checkbox"]').prop("name", item.element.id_base);
                    table.append(tr)
                });
                $(soundlikeListHtml).find("input#not_in_list").attr("id", "show_add_perso");
                $("div#game_content").html(soundlikeListHtml);
                $("body").off("click", ".anim-checkbox");
                triggerUiAnimation()
            }
        }, function() {
            showError();
            $("div#game_content").off("click", "a#a_retry");
            $("div#game_content").on("click", "a#a_retry", function() {
                soundlikeSearch(name)
            })
        })
    }

    function showSoundlikeAddCharacter() {
        showOverlayLoading();
        $.ajax({
            url: Routing.generate("soundlike_add")
        }).done(function(data, textStatus, jqXHR) {
            $("div#game_content").html(data);
            triggerUiAnimation()
        }).fail(function(jqXHR, textStatus, errorThrown) {
            showError();
            $("div#game_content").off("click", "a#a_retry");
            $("div#game_content").on("click", "a#a_retry", function() {
                showSoundlikeAddCharacter()
            })
        })
    }

    function addElement(name, desc) {
        showOverlayLoading();
        var gameData = $.elokWrapperStorage.get("gameData");
        $.when(apiLimuleClient.newElement({
            session: gameData.session,
            signature: gameData.signature,
            name: $($.parseHTML(name)).text(),
            description: $($.parseHTML(desc)).text()
        }), $.ajax({
            url: Routing.generate("end_game_akinator_lost")
        })).then(function(soundlikeAddResult, endGameHtmlResult) {
            var endGameHtml = $.parseHTML(endGameHtmlResult[0]);
            $(endGameHtml).find("ul.social-network").find("a.icoFacebook").attr("href", "http://www.facebook.com/dialog/feed?app_id=816000808484297&link=http://www.akinator.com/&picture=http://en.akinator.com/imgs/lampeWho.png&name=" + encodeURIComponent(Translator.trans("J_AI_PIEGE_AKINATOR_EN_PENSANT_A") + " " + name) + "&caption=" + encodeURIComponent(Translator.trans("AKINATOR_LE_GENIE_DU_WEB_QUI_LIT_DANS_VOS_PENSEES")) + "&description=" + encodeURIComponent(Translator.trans("PENSEZ_A_UN_PERSONNAGE_REEL_OU_FICTIF") + ". " + Translator.trans("JE_VAIS_TENTER_DE_LE_DEVINER") + ".") + "&redirect_uri=http://www.akinator.com");
            $(endGameHtml).find("ul.social-network").find("a.icoTwitter").attr("href", "http://twitter.com/share?via=akinator_team&amp;url=http%3A%2F%2Fwww.akinator.com%2F&amp;text=" + encodeURIComponent(Translator.trans("J_AI_PIEGE_AKINATOR_EN_PENSANT_A") + " " + name));
            $("div#game_content").html(endGameHtml);
            changeAkitude(function() {
                triggerUiAnimation()
            }, "deception")
        }, function() {
            showError();
            $("div#game_content").off("click", "a#a_retry");
            $("div#game_content").on("click", "a#a_retry", function() {
                addElement(name, desc)
            })
        })
    }

    function acceptSoundlike(index, nameAndDesc) {
        showOverlayLoading();
        var gameData = $.elokWrapperStorage.get("gameData");
        $.when(apiLimuleClient.soundlikeAcceptance({
            session: gameData.session,
            signature: gameData.signature,
            number: index
        }), $.ajax({
            url: Routing.generate("end_game_akinator_lost")
        })).then(function(soundlikeAcceptResult, endGameHtmlResult) {
            var endGameHtml = $.parseHTML(endGameHtmlResult[0]);
            $(endGameHtml).find("ul.social-network").find("a.icoFacebook").attr("href", "http://www.facebook.com/dialog/feed?app_id=816000808484297&link=http://www.akinator.com/&picture=http://en.akinator.com/imgs/lampeWho.png&name=" + encodeURIComponent(Translator.trans("J_AI_PIEGE_AKINATOR_EN_PENSANT_A") + " " + nameAndDesc) + "&caption=" + encodeURIComponent(Translator.trans("AKINATOR_LE_GENIE_DU_WEB_QUI_LIT_DANS_VOS_PENSEES")) + "&description=" + encodeURIComponent(Translator.trans("PENSEZ_A_UN_PERSONNAGE_REEL_OU_FICTIF") + ". " + Translator.trans("JE_VAIS_TENTER_DE_LE_DEVINER") + ".") + "&redirect_uri=http://www.akinator.com");
            $(endGameHtml).find("ul.social-network").find("a.icoTwitter").attr("href", "http://twitter.com/share?via=akinator_team&amp;url=http%3A%2F%2Fwww.akinator.com%2F&amp;text=" + encodeURIComponent(Translator.trans("J_AI_PIEGE_AKINATOR_EN_PENSANT_A") + " " + nameAndDesc));
            $("div#game_content").html(endGameHtml);
            changeAkitude(function() {
                triggerUiAnimation()
            }, "deception")
        }, function() {
            showError();
            $("div#game_content").off("click", "a#a_retry");
            $("div#game_content").on("click", "a#a_retry", function() {
                acceptSoundlike(index, nameAndDesc)
            })
        })
    }

    function sendDoublons(type, listIdsBase) {
        showOverlayLoading();
        $.when(apiLimuleClient.sendDuplicate({
            ids_doublons: listIdsBase,
            org: type
        }), $.ajax({
            url: Routing.generate("end_game_akinator_lost")
        })).then(function(sendDuplicateResult, endGameHtmlResult) {
            var endGameHtml = $.parseHTML(endGameHtmlResult[0]);
            $(endGameHtml).find("div.share-box").remove();
            $(endGameHtml).find("div.bubble-win").css("margin-bottom", "10px");
            $("div#game_content").html(endGameHtml);
            changeAkitude(function() {
                triggerUiAnimation()
            }, "deception")
        }, function() {
            showError();
            $("div#game_content").off("click", "a#a_retry");
            $("div#game_content").on("click", "a#a_retry", function() {
                sendDoublons(type, listIdsBase)
            })
        })
    }

    function listMultiple() {
        showOverlayLoading();
        var gameData = $.elokWrapperStorage.get("gameData");
        $.when(apiLimuleClient.list({
            session: gameData.session,
            signature: gameData.signature,
            step: gameData.step,
            size: 20,
            max_pic_width: $.elokWrapperStorage.get("constraints").width_max_photo,
            max_pic_height: $.elokWrapperStorage.get("constraints").height_max_photo,
            pref_photos: "VO-OK",
            duel_allowed: 1,
            mode_question: 0
        }), $.ajax({
            url: Routing.generate("soundlike_list")
        })).then(function(listResult, soundlikeListHtmlResult) {
            var soundlikeListHtml = $.parseHTML(soundlikeListHtmlResult[0]);
            var table = $(soundlikeListHtml).find("table.custom-table");
            $.each(listResult.data.parameters.elements, function(index, object) {
                var tr = table.find("tr").first().clone();
                tr.find("a").prop("data-id", object.element.id_base).prop("id", object.element.id).html(object.element.name + " (" + object.element.description + ")");
                tr.removeClass("hidden");
                tr.find("label").prop("for", object.element.id_base);
                tr.find('input[type="checkbox"]').prop("name", object.element.id_base).prop("id", object.element.id_base);
                table.append(tr)
            });
            $("div#game_content").html(soundlikeListHtml);
            $("body").off("click", ".anim-checkbox");
            triggerUiAnimation()
        }, function() {
            showError();
            $("div#game_content").off("click", "a#a_retry");
            $("div#game_content").on("click", "a#a_retry", function() {
                listMultiple()
            })
        })
    }

    function sendCorrectionName(id_base, actualName, actualDesc, name, description, comment) {
        showOverlayLoading();
        $.when(apiLimuleClient.correctionName({
            objet_id: id_base,
            nouveau_nom: $($.parseHTML(name)).text(),
            nouvelle_desc: $($.parseHTML(description)).text(),
            ancien_nom: actualName,
            ancienne_desc: actualDesc,
            commentaire: $($.parseHTML(comment)).text()
        }), $.ajax({
            url: Routing.generate("end_game")
        })).then(function(correctionNameResult, endGameHtmlResult) {
            if (correctionNameResult.data.completion == "KO - RENAME STILL UNDER VALIDATION") {
                $("div#customModal").find("div.modal-body").append("<p>" + Translator.trans("RENAMING_UNDER_VALIDATION") + "</p>");
                $("#customModal").modal();
                triggerUiAnimation()
            } else {
                var gameActions = $.elokWrapperStorage.get("gameActions");
                if (typeof gameActions == "undefined" || gameActions == null) {
                    gameActions = new Array
                }
                gameActions.push("nameCorrection");
                $.elokWrapperStorage.set("gameActions", gameActions);
                showChoiceData(endGameHtmlResult, Translator.trans("MERCI_POUR_VOTRE_SIGNALEMENT") + ". " + Translator.trans("AVANT_D_ETRE_PRIS_EN_COMPTE_IL_DEVRA_ETRE_VALIDE_PAR_UN_ADMINISTRATEUR") + ".")
            }
        }, function() {
            showError();
            $("div#game_content").off("click", "a#a_retry");
            $("div#game_content").on("click", "a#a_retry", function() {
                sendCorrectionName(id_base, actualName, actualDesc, name, description, comment)
            })
        })
    }

    function showQuestionSearch() {
        showOverlayLoading();
        $.ajax({
            url: Routing.generate("search_question")
        }).done(function(data, textStatus, jqXHR) {
            var searchQuestionHtml = $.parseHTML(data);
            $("div#game_content").html(searchQuestionHtml);
            triggerUiAnimation()
        }).fail(function(jqXHR, textStatus, errorThrown) {
            showError();
            $("div#game_content").off("click", "a#a_retry");
            $("div#game_content").on("click", "a#a_retry", function() {
                showQuestionSearch()
            })
        })
    }

    function searchQuestion(search) {
        showOverlayLoading();
        var gameData = $.elokWrapperStorage.get("gameData");
        $.when(apiLimuleClient.searchQuestion({
            session: gameData.session,
            signature: gameData.signature,
            search: search
        })).then(function(searchQuestionResult) {
            if (searchQuestionResult.data.parameters.elements != null) {
                $("p#no_question_found").addClass("hidden");
                $("div#game_content").find("span#nb_questions").html(searchQuestionResult.data.parameters.elements.length);
                var table = $("div#game_content").find("table.custom-table>tbody");
                $.each(searchQuestionResult.data.parameters.elements, function(index, item) {
                    var tr = table.find("tr").first().clone();
                    tr.removeClass("hidden");
                    tr.find("a").prop("id", item.element.id).html(item.element.name);
                    table.append(tr)
                });
                $("div#question_found").show();
                $("p#no_question_found").addClass("hidden")
            } else {
                $("div#question_found").hide();
                $("p#no_question_found").removeClass("hidden")
            }
            $("section#section_question_search").removeClass("hidden").show();
            triggerUiAnimation()
        }, function() {
            showError();
            $("div#game_content").off("click", "a#a_retry");
            $("div#game_content").on("click", "a#a_retry", function() {
                searchQuestion(search)
            })
        })
    }

    function showAddQuestion(questionSelected) {
        showOverlayLoading();
        var gameData = $.elokWrapperStorage.get("gameData");
        $.when(apiLimuleClient.list({
            session: gameData.session,
            signature: gameData.signature,
            step: gameData.step,
            size: 10,
            max_pic_width: $.elokWrapperStorage.get("constraints").width_max_photo,
            max_pic_height: $.elokWrapperStorage.get("constraints").height_max_photo,
            pref_photos: "VO-OK",
            duel_allowed: 1,
            mode_question: 1
        }), $.ajax({
            url: Routing.generate("add_question")
        })).then(function(listResult, addQuestionHtmlResult) {
            var addQuestionHtml = $.parseHTML(addQuestionHtmlResult[0]);
            if (typeof questionSelected != "undefined" && questionSelected != null) {
                $(addQuestionHtml).find('input[name="question"]').prop("readonly", true);
                $(addQuestionHtml).find('input[name="question"]').val(questionSelected)
            }
            var table = $(addQuestionHtml).find("table.custom-table>tbody");
            $.each(listResult.data.parameters.elements, function(index, item) {
                var tr = table.find("tr").first().clone();
                tr.removeClass("hidden");
                tr.find(".first-column").html(item.element.name);
                table.append(tr)
            });
            $("div#game_content").html(addQuestionHtml);
            triggerUiAnimation()
        }, function() {
            showError();
            $("div#game_content").off("click", "a#a_retry");
            $("div#game_content").on("click", "a#a_retry", function() {
                showAddQuestion(questionSelected)
            })
        })
    }

    function sendQuestion(question, answers) {
        showOverlayLoading();
        var gameData = $.elokWrapperStorage.get("gameData");
        var idQuestionSelected = $.elokWrapperStorage.get("idQuestionSelected");
        $.when(apiLimuleClient.addQuestion({
            session: gameData.session,
            signature: gameData.signature,
            question: $($.parseHTML(question)).text(),
            player: apiLimuleClient.settings.player,
            answers: answers,
            num_question: typeof idQuestionSelected != "undefined" && idQuestionSelected != null ? idQuestionSelected : -1
        }), $.ajax({
            url: Routing.generate("end_game")
        })).then(function(sendQuestionResult, endGameHtmlResult) {
            var gameActions = $.elokWrapperStorage.get("gameActions");
            if (typeof gameActions == "undefined" || gameActions == null) {
                gameActions = new Array
            }
            gameActions.push("addQuestion");
            $.elokWrapperStorage.set("gameActions", gameActions);
            showChoiceData(endGameHtmlResult, Translator.trans("MERCI_VOTRE_QUESTION_A_ETE_AJOUTEE_ET_JE_COMMENCERAIS_A_LA_POSER_DES_SA_VALIDATION") + ".")
        }, function() {
            showError();
            $("div#game_content").off("click", "a#a_retry");
            $("div#game_content").on("click", "a#a_retry", function() {
                sendQuestion(question, answers)
            })
        })
    }

    function showProposePhoto() {
        showOverlayLoading();
        var gameData = $.elokWrapperStorage.get("gameData");
        $.ajax({
            url: Routing.generate("propose_photo")
        }).done(function(data, textStatus, jqXHR) {
            var proposePhotoHtml = $.parseHTML(data);
            $(proposePhotoHtml).find('input[name="session"]').val(gameData.session);
            $(proposePhotoHtml).find('input[name="signature"]').val(gameData.signature);
            $(proposePhotoHtml).find('input[name="url_to_play"]').val($.elokWrapperStorage.get("urlToPlay"));
            $(proposePhotoHtml).find('input[name="id_base"]').val(gameData.id_base);
            $("div#game_content").html(proposePhotoHtml);
            triggerUiAnimation();
            $(":file").jfilestyle({
                buttonBefore: true,
                text: Translator.trans("PARCOURIR"),
                placeholder: Translator.trans("NO_FILE_SELECTED")
            });
            $(proposePhotoHtml).find("form").validator("update")
        }).fail(function(jqXHR, textStatus, errorThrown) {
            showError();
            $("div#game_content").off("click", "a#a_retry");
            $("div#game_content").on("click", "a#a_retry", function() {
                showProposePhoto()
            })
        })
    }

    function callUploadPhoto(formData) {
        showOverlayLoading();
        $.ajax({
            url: Routing.generate("send_photo"),
            type: "POST",
            data: formData,
            processData: false,
            contentType: false,
            cache: false,
            dataType: "json"
        }).done(function(data, textStatus, jqXHR) {
            if (typeof data.status != "undefined") {
                if (data.status == "KO") {
                    $("div#game_content").find("div.error").html(data.message).removeClass("hidden");
                    $("div#game_content").find("div.success").html(data.message).addClass("hidden")
                } else {
                    $("div#game_content").find("div.success").html(data.message).removeClass("hidden");
                    $("div#game_content").find("div.error").html(data.message).addClass("hidden");
                    $("div#game_content").find("div.aki-formulaire").addClass("hidden")
                }
            } else {
                $("div#game_content").find("div.error").html(Translator.trans("PROBLEME_TECHNIQUE_REESSAYER_PLUS_TARD")).removeClass("hidden");
                $("div#game_content").find("div.success").html(data.message).addClass("hidden")
            }
        }).fail(function(jqXHR, textStatus, errorThrown) {
            $("div#game_content").find("div.error").html(Translator.trans("PROBLEME_TECHNIQUE_REESSAYER_PLUS_TARD")).removeClass("hidden")
        }).always(function() {
            $("div#game_content").find("div#div-overlay").addClass("hidden");
            $("div#game_content").find("div.col-md-12").removeClass("overlayed")
        })
    }

    function showAddPhoto() {
        showOverlayLoading();
        var gameData = $.elokWrapperStorage.get("gameData");
        $.ajax({
            url: Routing.generate("add_photo")
        }).done(function(data, textStatus, jqXHR) {
            var addPhotoHtml = $.parseHTML(data);
            $(addPhotoHtml).find('input[name="session"]').val(gameData.session);
            $(addPhotoHtml).find('input[name="signature"]').val(gameData.signature);
            $(addPhotoHtml).find('input[name="url_to_play"]').val($.elokWrapperStorage.get("urlToPlay"));
            $(addPhotoHtml).find('input[name="id_base"]').val(gameData.id_base);
            $("div#game_content").html(addPhotoHtml);
            triggerUiAnimation();
            $(":file").jfilestyle({
                buttonBefore: true,
                text: Translator.trans("PARCOURIR"),
                placeholder: Translator.trans("NO_FILE_SELECTED")
            });
            $(addPhotoHtml).find("form").validator("update")
        }).fail(function(jqXHR, textStatus, errorThrown) {
            showError();
            $("div#game_content").off("click", "a#a_retry");
            $("div#game_content").on("click", "a#a_retry", function() {
                showAddPhoto()
            })
        })
    }
    $("body").on("new_session", function() {
        newSession()
    });
    $("div#game_content").on("click", "a#a_replay", function(event) {
        event.preventDefault();
        window.location.href = Routing.generate("game")
    });
    $("div#game_content").on("click", "a#a_replay_children", function(event) {
        event.preventDefault();
        showOverlayLoading();
        var gameData = $.elokWrapperStorage.get("gameData");
        $.when(apiLimuleClient.cancelGame({
            session: gameData.session,
            signature: gameData.signature
        })).then(function(cancelGameResult) {
            window.location.href = Routing.generate("game")
        })
    });
    $("div#game_content").on("click", "a#a_yes,a#a_no,a#a_dont_know,a#a_probably,a#a_probaly_not", function(event) {
        var link = $(event.target);
        event.preventDefault();
        if (!link.data("lockedAt") || +new Date - link.data("lockedAt") > 500) {
            answer($("a#a_yes,a#a_no,a#a_dont_know,a#a_probably,a#a_probaly_not").index(this))
        }
        link.data("lockedAt", +new Date)
    });
    $("div#game_content").on("click", "a#a_cancel_answer", function(event) {
        event.preventDefault();
        cancelAnswer()
    });
    $("body").on("propose", function(event) {
        event.preventDefault();
        propose()
    });
    $("div#game_content").on("click", "a#a_propose_yes", function(event) {
        event.preventDefault();
        showOverlayLoading();
        var gameData = $.elokWrapperStorage.get("gameData");
        if (gameData.flag_photo == 4) {
            listPhotosVote()
        } else {
            callChoice()
        }
    });
    $("div#game_content").on("click", "input#vote_champion,input#vote_challenger", function(event) {
        event.preventDefault();
        votePhoto(event)
    });
    $("div#game_content").on("click", "a#a_continue_to_choice", function(event) {
        event.preventDefault();
        callChoice()
    });
    $("div#game_content").on("click", "a#a_propose_no", function(event) {
        event.preventDefault();
        if ($.elokWrapperStorage.get("gameData").completion == "WARN - NO QUESTION") {
            showSoundlikeSearch()
        } else {
            var divGameContent = $("div#game_content");
            divGameContent.find("div.sub-bubble-propose>p").html("&nbsp;");
            divGameContent.find("span.proposal-title").html(Translator.trans("ON_CONTINUE"));
            divGameContent.find("span.proposal-subtitle").html("&nbsp;");
            divGameContent.find("span.proposal-answers").empty().append('<a href="javascript:void(0);" id="a_continue_yes">' + Translator.trans("OUI") + '</a><span class="star"></span><a href="javascript:void(0);" id="a_continue_no">' + Translator.trans("NON") + "</a>")
        }
    });
    $("div#game_content").on("click", "a#a_continue_yes", function(event) {
        event.preventDefault();
        exclude()
    });
    $("div#game_content").on("click", "a#a_continue_no", function(event) {
        event.preventDefault();
        var gameData = $.elokWrapperStorage.get("gameData");
        if (gameData.nb_elements < 2) {
            $.elokWrapperStorage.set("soundlikeType", "SSL");
            showSoundlikeSearch()
        } else {
            $.elokWrapperStorage.set("soundlikeType", "LST");
            listMultiple()
        }
    });
    $("div#game_content").on("click", "input#input-soundlike-search", function(event) {
        event.preventDefault();
        var search = $("div#game_content").find('input[name="name"]').val().trim();
        if (search.length < 2 || search.length > 100) {
            $("div#customModal").find("div.modal-body").append("<p>" + Translator.trans("LA_LONGUEUR_DU_NOM_DOIT_ETRE_COMPRISE_ENTRE_2_ET_100_CARACTERES") + "</p>");
            $("#customModal").modal();
            return false
        }
        soundlikeSearch(search)
    });
    $("div#game_content").on("click", "input#show_add_perso", function(event) {
        event.preventDefault();
        showSoundlikeAddCharacter()
    });
    $("div#game_content").on("click", "input#add_perso", function(event) {
        event.preventDefault();
        var name = $("div#game_content").find('input[name="name"]').val().trim();
        var desc = $("div#game_content").find('input[name="desc"]').val().trim();
        if (name.length < 2 || name.length > 100) {
            $("div#customModal").find("div.modal-body").html("");
            $("div#customModal").find("div.modal-body").append("<p>" + Translator.trans("LA_LONGUEUR_DU_NOM_DOIT_ETRE_COMPRISE_ENTRE_2_ET_100_CARACTERES") + "</p>");
            $("#customModal").modal();
            return false
        }
        if (desc.length < 2 || desc.length > 50) {
            $("div#customModal").find("div.modal-body").html("");
            $("div#customModal").find("div.modal-body").append("<p>" + Translator.trans("LA_LONGUEUR_DE_LA_DESCRIPTION_DOIT_ETRE_COMPRISE_ENTRE_2_ET_50_CARACTERES") + "</p>");
            $("#customModal").modal();
            return false
        }
        name = name.replace(/</g, "&lt;").replace(/>/g, "&gt;");
        desc = desc.replace(/</g, "&lt;").replace(/>/g, "&gt;");
        addElement(name, desc)
    });
    $("div#game_content").on("click", "a.soundlike-acceptance", function(event) {
        event.preventDefault();
        if ($.elokWrapperStorage.get("soundlikeType") == "LST") {
            var gameData = $.elokWrapperStorage.get("gameData");
            gameData.id = $(this).attr("id");
            $.elokWrapperStorage.set("gameData", gameData);
            callChoiceLostGame()
        } else {
            acceptSoundlike($(this).attr("id"), $(this).text())
        }
    });
    $("div#game_content").on("click", "input#doublon", function(event) {
        event.preventDefault();
        $("div#game_content").off("click", "a.soundlike-acceptance");
        $("div#game_content").find("table").find(".chck_soundlike").removeClass("hidden");
        $("div#game_content").find("input#doublon").prop("id", "send_doublon").val(Translator.trans("ENVOYER"))
    });
    $("div#game_content").on("click", "input#send_doublon", function(event) {
        event.preventDefault();
        var nbElementsChecked = $("input.anim-checkbox:checked").length;
        if (nbElementsChecked == 0) {
            $("div#customModal").find("div.modal-body").append("<p>" + Translator.trans("SELECTIONNEZ_AU_MOINS_UNE_CASE") + ".</p>");
            $("#customModal").modal();
            return false
        }
        if (nbElementsChecked == 1) {
            var nameAndDesc = $("input.anim-checkbox:checked").parents("tr").first().find("a.soundlike-acceptance").html();
            showOverlayLoading();
            $.ajax({
                url: Routing.generate("end_game_akinator_lost")
            }).done(function(data, textStatus, jqXHR) {
                var endGameHtml = $.parseHTML(data);
                $(endGameHtml).find("ul.social-network").find("a.icoFacebook").attr("href", "http://www.facebook.com/dialog/feed?app_id=816000808484297&link=http://www.akinator.com/&picture=http://en.akinator.com/imgs/lampeWho.png&name=" + encodeURIComponent(Translator.trans("J_AI_PIEGE_AKINATOR_EN_PENSANT_A") + " " + nameAndDesc) + "&caption=" + encodeURIComponent(Translator.trans("AKINATOR_LE_GENIE_DU_WEB_QUI_LIT_DANS_VOS_PENSEES")) + "&description=" + encodeURIComponent(Translator.trans("PENSEZ_A_UN_PERSONNAGE_REEL_OU_FICTIF") + ". " + Translator.trans("JE_VAIS_TENTER_DE_LE_DEVINER") + ".") + "&redirect_uri=http://www.akinator.com");
                $(endGameHtml).find("ul.social-network").find("a.icoTwitter").attr("href", "http://twitter.com/share?via=akinator_team&amp;url=http%3A%2F%2Fwww.akinator.com%2F&amp;text=" + encodeURIComponent(Translator.trans("J_AI_PIEGE_AKINATOR_EN_PENSANT_A") + " " + nameAndDesc));
                $("div#game_content").html(endGameHtml);
                changeAkitude(function() {
                    triggerUiAnimation()
                }, "deception")
            })
        } else {
            var listIdBase = "";
            $("input.anim-checkbox:checked").each(function() {
                listIdBase += $(this).attr("id") + ","
            });
            listIdBase = listIdBase.substring(0, listIdBase.length - 1);
            sendDoublons($.elokWrapperStorage.get("soundlikeType"), listIdBase)
        }
    });
    $("div#game_content").on("click", "input#not_in_list", function(event) {
        event.preventDefault();
        $.elokWrapperStorage.set("soundlikeType", "SSL");
        showSoundlikeSearch()
    });
    $("div#game_content").on("click", "a#a_propose_photo", function(event) {
        event.preventDefault();
        showProposePhoto()
    });
    $("div#game_content").on("click", "button#submit_propose_photo", function(event) {
        event.preventDefault();
        var form = $("form").get(0);
        var formData = new FormData(form);
        formData.append("file", $("input[type=file]")[0].files[0]);
        callUploadPhoto(formData)
    });
    $("div#game_content").on("click", "a#a_add_photo", function(event) {
        event.preventDefault();
        showAddPhoto()
    });
    $("div#game_content").on("click", "button#submit_add_photo", function(event) {
        event.preventDefault();
        var form = $("form").get(0);
        var formData = new FormData(form);
        formData.append("file", $("input[type=file]")[0].files[0]);
        callUploadPhoto(formData)
    });
    $("div#game_content").on("click", "a#a_game_report", function(event) {
        event.preventDefault();
        gameReport()
    });
    $("div#game_content").on("click", "a#a_search_question", function(event) {
        event.preventDefault();
        var gameActions = $.elokWrapperStorage.get("gameActions");
        if (typeof gameActions != "undefined" && gameActions != null) {
            if (gameActions.indexOf("addQuestion") != -1) {
                $("div#customModal").find("div.modal-body").html("");
                $("div#customModal").find("div.modal-body").append("<p>" + Translator.trans("VOUS_NE_POUVEZ_AJOUTER_QUNE_QUESTION") + ".</p>");
                $("#customModal").modal();
                return false
            }
        }
        showQuestionSearch()
    });
    $("div#game_content").on("click", "input#search_question", function(event) {
        event.preventDefault();
        var search = $("div#game_content").find('input[name="question"]').val().trim();
        if (search.trim().length < 3) {
            $("div#customModal").find("div.modal-body").html("");
            $("div#customModal").find("div.modal-body").append("<p>" + Translator.trans("LA_CHAINE_DE_RECHERCHE_NE_PEUT_PAS_FAIRE_MOINS_DE_3_CARACTERES") + "</p>");
            $("#customModal").modal();
            return false
        }
        $("div#game_content").find("table.custom-table>tbody").find("tr:gt(0)").remove();
        searchQuestion(search.substring(0, 10))
    });
    $("div#game_content").on("click", "input#no_question_exists", function(event) {
        event.preventDefault();
        showAddQuestion()
    });
    $("div#game_content").on("click", "a.question-acceptance", function(event) {
        event.preventDefault();
        $.elokWrapperStorage.set("idQuestionSelected", $(this).attr("id"));
        showAddQuestion($(this).text())
    });
    $("div#game_content").on("click", "a#a_add_question", function(event) {
        event.preventDefault();
        showAddQuestion()
    });
    $("div#game_content").on("click", "input#send_question", function(event) {
        event.preventDefault();
        var question = $("div#game_content").find('input[name="question"]').val().trim();
        if (question.length < 10) {
            $("div#customModal").find("div.modal-body").html("");
            $("div#customModal").find("div.modal-body").append("<p>" + Translator.trans("VOTRE_QUESTION_EST_TROP_COURTE_MINIMUM_10_CARACTERES") + "</p>");
            $("#customModal").modal();
            return false
        }
        if (question.length > 150) {
            $("div#customModal").find("div.modal-body").html("");
            $("div#customModal").find("div.modal-body").append("<p>" + Translator.trans("VOTRE_QUESTION_EST_TROP_LONGUE_MAXIMUM_150_CARACTERES") + "</p>");
            $("#customModal").modal();
            return false
        }
        var answers = "";
        var repOk = -1;
        var isValid = false;
        $.each($("table.custom-table select:visible"), function() {
            var value = $(this).find("option:selected").val();
            if (value != -1 && repOk == -1) {
                repOk = value
            }
            if (value != repOk && value != -1) {
                isValid = true
            }
            answers += "|" + value
        });
        if (isValid == false) {
            $("div#customModal").find("div.modal-body").html("");
            $("div#customModal").find("div.modal-body").append("<p>" + Translator.trans("IL_FAUT_OBLIGATOIREMENT_AU_MOINS_DEUX_REPONSES_DIFFERENTES") + "</p>");
            $("#customModal").modal();
            return false
        }
        answers = answers.substr(1);
        sendQuestion(question, answers)
    });
    $("div#game_content").on("click", "a#a_correction_name", function(event) {
        event.preventDefault();
        var gameActions = $.elokWrapperStorage.get("gameActions");
        if (typeof gameActions != "undefined" && gameActions != null) {
            if (gameActions.indexOf("nameCorrection") != -1) {
                $("div#customModal").find("div.modal-body").html("");
                $("div#customModal").find("div.modal-body").append("<p>" + Translator.trans("VOUS_NE_POUVEZ_MODIFIER_UN_NOM_PAR_PARTIE") + ".</p>");
                $("#customModal").modal();
                return false
            }
        }
        showOverlayLoading();
        var gameData = $.elokWrapperStorage.get("gameData");
        $.ajax({
            url: Routing.generate("name_correction")
        }).done(function(data, textStatus, jqXHR) {
            var correctionNameHtml = $.parseHTML(data);
            $(correctionNameHtml).find("span#actual_name").html(gameData.nom);
            $(correctionNameHtml).find("span#actual_desc").html(gameData.description);
            $("div#game_content").html(correctionNameHtml);
            triggerUiAnimation()
        })
    });
    $("div#game_content").on("click", "input#input-correction-name", function(event) {
        event.preventDefault();
        var name = $('input[name="new_name"]').val().trim();
        var description = $('input[name="new_desc"]').val().trim();
        var comment = $('textarea[name="comment"]').val().trim();
        if (name.length < 2 || name.length > 100) {
            $("div#customModal").find("div.modal-body").append("<p>" + Translator.trans("LA_LONGUEUR_DU_NOM_DOIT_ETRE_COMPRISE_ENTRE_2_ET_100_CARACTERES") + "</p>");
            $("#customModal").modal();
            return false
        }
        if (description.length < 2 || description.length > 50) {
            $("div#customModal").find("div.modal-body").append("<p>" + Translator.trans("LA_LONGUEUR_DE_LA_DESCRIPTION_DOIT_ETRE_COMPRISE_ENTRE_2_ET_50_CARACTERES") + "</p>");
            $("#customModal").modal();
            return false
        }
        if (comment.length < 2 || comment.length > 255) {
            $("div#customModal").find("div.modal-body").append("<p>" + Translator.trans("LA_LONGUEUR_DU_COMMENTAIRE_DOIT_ETRE_COMPRISE_ENTRE_2_ET_255_CARACTERES") + "</p>");
            $("#customModal").modal();
            return false
        }
        var gameData = $.elokWrapperStorage.get("gameData");
        sendCorrectionName(gameData.id_base, $("span#actual_name").html(), $("span#actual_desc").html(), name, description, comment)
    });
    $("div#game_content").on("click", "a#a_back_to_choice", function(event) {
        event.preventDefault();
        showOverlayLoading();
        $.ajax({
            url: Routing.generate("end_game")
        }).done(function(data, textStatus, jqXHR) {
            showChoiceData(data)
        })
    })
});