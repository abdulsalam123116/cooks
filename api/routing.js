fos.Router.setData({
    "base_url": "",
    "routes": {
        "bazinga_jstranslation_js": {
            "tokens": [
                ["variable", ".", "js|json", "_format"],
                ["variable", "\/", "[\\w]+", "domain"],
                ["text", "\/translations"]
            ],
            "defaults": {
                "domain": "messages",
                "_format": "js"
            },
            "requirements": {
                "_format": "js|json",
                "domain": "[\\w]+"
            },
            "hosttokens": [],
            "methods": ["GET"],
            "schemes": []
        },
        "home": {
            "tokens": [
                ["variable", "\/", "[a-zA-Z.]{2}", "country_code"]
            ],
            "defaults": {
                "country_code": null,
                "_locale": "en"
            },
            "requirements": {
                "country_code": "[a-zA-Z.]{2}"
            },
            "hosttokens": [
                ["text", ".akinator.com"],
                ["variable", "", "[^\\.]++", "_locale"]
            ],
            "methods": [],
            "schemes": []
        },
        "new_session": {
            "tokens": [
                ["text", "\/new_session"]
            ],
            "defaults": {
                "_locale": "en"
            },
            "requirements": [],
            "hosttokens": [
                ["text", ".akinator.com"],
                ["variable", "", "[^\\.]++", "_locale"]
            ],
            "methods": [],
            "schemes": []
        },
        "answer_api": {
            "tokens": [
                ["text", "\/answer_api"]
            ],
            "defaults": {
                "_locale": "en"
            },
            "requirements": [],
            "hosttokens": [
                ["text", ".akinator.com"],
                ["variable", "", "[^\\.]++", "_locale"]
            ],
            "methods": [],
            "schemes": []
        },
        "game": {
            "tokens": [
                ["text", "\/game"]
            ],
            "defaults": {
                "_locale": "en"
            },
            "requirements": [],
            "hosttokens": [
                ["text", ".akinator.com"],
                ["variable", "", "[^\\.]++", "_locale"]
            ],
            "methods": [],
            "schemes": []
        },
        "answer": {
            "tokens": [
                ["text", "\/answer"]
            ],
            "defaults": {
                "_locale": "en"
            },
            "requirements": [],
            "hosttokens": [
                ["text", ".akinator.com"],
                ["variable", "", "[^\\.]++", "_locale"]
            ],
            "methods": [],
            "schemes": []
        },
        "list": {
            "tokens": [
                ["text", "\/list"]
            ],
            "defaults": {
                "_locale": "en"
            },
            "requirements": [],
            "hosttokens": [
                ["text", ".akinator.com"],
                ["variable", "", "[^\\.]++", "_locale"]
            ],
            "methods": [],
            "schemes": []
        },
        "technical_error": {
            "tokens": [
                ["text", "\/technical-error"]
            ],
            "defaults": {
                "_locale": "en"
            },
            "requirements": [],
            "hosttokens": [
                ["text", ".akinator.com"],
                ["variable", "", "[^\\.]++", "_locale"]
            ],
            "methods": [],
            "schemes": []
        },
        "end_game": {
            "tokens": [
                ["text", "\/end-game"]
            ],
            "defaults": {
                "_locale": "en"
            },
            "requirements": [],
            "hosttokens": [
                ["text", ".akinator.com"],
                ["variable", "", "[^\\.]++", "_locale"]
            ],
            "methods": [],
            "schemes": []
        },
        "end_game_akinator_lost": {
            "tokens": [
                ["text", "\/end-game-akinator-lost"]
            ],
            "defaults": {
                "_locale": "en"
            },
            "requirements": [],
            "hosttokens": [
                ["text", ".akinator.com"],
                ["variable", "", "[^\\.]++", "_locale"]
            ],
            "methods": [],
            "schemes": []
        },
        "picture_fight": {
            "tokens": [
                ["text", "\/picture-fight"]
            ],
            "defaults": {
                "_locale": "en"
            },
            "requirements": [],
            "hosttokens": [
                ["text", ".akinator.com"],
                ["variable", "", "[^\\.]++", "_locale"]
            ],
            "methods": [],
            "schemes": []
        },
        "picture_vote": {
            "tokens": [
                ["text", "\/picture-vote"]
            ],
            "defaults": {
                "_locale": "en"
            },
            "requirements": [],
            "hosttokens": [
                ["text", ".akinator.com"],
                ["variable", "", "[^\\.]++", "_locale"]
            ],
            "methods": [],
            "schemes": []
        },
        "picture_already_voted": {
            "tokens": [
                ["text", "\/picture-already-voted"]
            ],
            "defaults": {
                "_locale": "en"
            },
            "requirements": [],
            "hosttokens": [
                ["text", ".akinator.com"],
                ["variable", "", "[^\\.]++", "_locale"]
            ],
            "methods": [],
            "schemes": []
        },
        "not_for_children": {
            "tokens": [
                ["text", "\/not-for-children"]
            ],
            "defaults": {
                "_locale": "en"
            },
            "requirements": [],
            "hosttokens": [
                ["text", ".akinator.com"],
                ["variable", "", "[^\\.]++", "_locale"]
            ],
            "methods": [],
            "schemes": []
        },
        "game_report": {
            "tokens": [
                ["text", "\/game-report"]
            ],
            "defaults": {
                "_locale": "en"
            },
            "requirements": [],
            "hosttokens": [
                ["text", ".akinator.com"],
                ["variable", "", "[^\\.]++", "_locale"]
            ],
            "methods": [],
            "schemes": []
        },
        "search_question": {
            "tokens": [
                ["text", "\/search-question"]
            ],
            "defaults": {
                "_locale": "en"
            },
            "requirements": [],
            "hosttokens": [
                ["text", ".akinator.com"],
                ["variable", "", "[^\\.]++", "_locale"]
            ],
            "methods": [],
            "schemes": []
        },
        "add_question": {
            "tokens": [
                ["text", "\/add-question"]
            ],
            "defaults": {
                "_locale": "en"
            },
            "requirements": [],
            "hosttokens": [
                ["text", ".akinator.com"],
                ["variable", "", "[^\\.]++", "_locale"]
            ],
            "methods": [],
            "schemes": []
        },
        "name_correction": {
            "tokens": [
                ["text", "\/name-correction"]
            ],
            "defaults": {
                "_locale": "en"
            },
            "requirements": [],
            "hosttokens": [
                ["text", ".akinator.com"],
                ["variable", "", "[^\\.]++", "_locale"]
            ],
            "methods": [],
            "schemes": []
        },
        "propose_photo": {
            "tokens": [
                ["text", "\/propose-photo"]
            ],
            "defaults": {
                "_locale": "en"
            },
            "requirements": [],
            "hosttokens": [
                ["text", ".akinator.com"],
                ["variable", "", "[^\\.]++", "_locale"]
            ],
            "methods": [],
            "schemes": []
        },
        "send_photo": {
            "tokens": [
                ["text", "\/send-photo"]
            ],
            "defaults": {
                "_locale": "en"
            },
            "requirements": [],
            "hosttokens": [
                ["text", ".akinator.com"],
                ["variable", "", "[^\\.]++", "_locale"]
            ],
            "methods": ["POST"],
            "schemes": []
        },
        "add_photo": {
            "tokens": [
                ["text", "\/add-photo"]
            ],
            "defaults": {
                "_locale": "en"
            },
            "requirements": [],
            "hosttokens": [
                ["text", ".akinator.com"],
                ["variable", "", "[^\\.]++", "_locale"]
            ],
            "methods": [],
            "schemes": []
        },
        "soundlike_search": {
            "tokens": [
                ["text", "\/soundlike-search"]
            ],
            "defaults": {
                "_locale": "en"
            },
            "requirements": [],
            "hosttokens": [
                ["text", ".akinator.com"],
                ["variable", "", "[^\\.]++", "_locale"]
            ],
            "methods": [],
            "schemes": []
        },
        "soundlike_list": {
            "tokens": [
                ["text", "\/soundlike-list"]
            ],
            "defaults": {
                "_locale": "en"
            },
            "requirements": [],
            "hosttokens": [
                ["text", ".akinator.com"],
                ["variable", "", "[^\\.]++", "_locale"]
            ],
            "methods": [],
            "schemes": []
        },
        "soundlike_add": {
            "tokens": [
                ["text", "\/soundlike-add"]
            ],
            "defaults": {
                "_locale": "en"
            },
            "requirements": [],
            "hosttokens": [
                ["text", ".akinator.com"],
                ["variable", "", "[^\\.]++", "_locale"]
            ],
            "methods": [],
            "schemes": []
        },
        "m_home": {
            "tokens": [
                ["variable", "\/", "[a-zA-Z.]{2,3}", "country_code"]
            ],
            "defaults": {
                "country_code": null,
                "_locale": "en"
            },
            "requirements": {
                "country_code": "[a-zA-Z.]{2,3}"
            },
            "hosttokens": [
                ["text", ".akinator.mobi"],
                ["variable", "", "[^\\.]++", "_locale"]
            ],
            "methods": [],
            "schemes": []
        },
        "m_new_session": {
            "tokens": [
                ["text", "\/m_new_session"]
            ],
            "defaults": {
                "_locale": "en"
            },
            "requirements": [],
            "hosttokens": [
                ["text", ".akinator.mobi"],
                ["variable", "", "[^\\.]++", "_locale"]
            ],
            "methods": [],
            "schemes": []
        },
        "m_answer_api": {
            "tokens": [
                ["text", "\/m_answer_api"]
            ],
            "defaults": {
                "_locale": "en"
            },
            "requirements": [],
            "hosttokens": [
                ["text", ".akinator.mobi"],
                ["variable", "", "[^\\.]++", "_locale"]
            ],
            "methods": [],
            "schemes": []
        },
        "m_game": {
            "tokens": [
                ["text", "\/game"]
            ],
            "defaults": {
                "_locale": "en"
            },
            "requirements": [],
            "hosttokens": [
                ["text", ".akinator.mobi"],
                ["variable", "", "[^\\.]++", "_locale"]
            ],
            "methods": [],
            "schemes": []
        },
        "m_answer": {
            "tokens": [
                ["text", "\/answer"]
            ],
            "defaults": {
                "_locale": "en"
            },
            "requirements": [],
            "hosttokens": [
                ["text", ".akinator.mobi"],
                ["variable", "", "[^\\.]++", "_locale"]
            ],
            "methods": [],
            "schemes": []
        },
        "m_list": {
            "tokens": [
                ["text", "\/list"]
            ],
            "defaults": {
                "_locale": "en"
            },
            "requirements": [],
            "hosttokens": [
                ["text", ".akinator.mobi"],
                ["variable", "", "[^\\.]++", "_locale"]
            ],
            "methods": [],
            "schemes": []
        },
        "m_technical_error": {
            "tokens": [
                ["text", "\/technical-error"]
            ],
            "defaults": {
                "_locale": "en"
            },
            "requirements": [],
            "hosttokens": [
                ["text", ".akinator.mobi"],
                ["variable", "", "[^\\.]++", "_locale"]
            ],
            "methods": [],
            "schemes": []
        },
        "m_end_game": {
            "tokens": [
                ["text", "\/end-game"]
            ],
            "defaults": {
                "_locale": "en"
            },
            "requirements": [],
            "hosttokens": [
                ["text", ".akinator.mobi"],
                ["variable", "", "[^\\.]++", "_locale"]
            ],
            "methods": [],
            "schemes": []
        },
        "m_end_game_akinator_lost": {
            "tokens": [
                ["text", "\/end-game-akinator-lost"]
            ],
            "defaults": {
                "_locale": "en"
            },
            "requirements": [],
            "hosttokens": [
                ["text", ".akinator.mobi"],
                ["variable", "", "[^\\.]++", "_locale"]
            ],
            "methods": [],
            "schemes": []
        },
        "m_not_for_children": {
            "tokens": [
                ["text", "\/not-for-children"]
            ],
            "defaults": {
                "_locale": "en"
            },
            "requirements": [],
            "hosttokens": [
                ["text", ".akinator.mobi"],
                ["variable", "", "[^\\.]++", "_locale"]
            ],
            "methods": [],
            "schemes": []
        },
        "m_soundlike_search": {
            "tokens": [
                ["text", "\/soundlike-search"]
            ],
            "defaults": {
                "_locale": "en"
            },
            "requirements": [],
            "hosttokens": [
                ["text", ".akinator.mobi"],
                ["variable", "", "[^\\.]++", "_locale"]
            ],
            "methods": [],
            "schemes": []
        },
        "m_soundlike_list": {
            "tokens": [
                ["text", "\/soundlike-list"]
            ],
            "defaults": {
                "_locale": "en"
            },
            "requirements": [],
            "hosttokens": [
                ["text", ".akinator.mobi"],
                ["variable", "", "[^\\.]++", "_locale"]
            ],
            "methods": [],
            "schemes": []
        },
        "m_soundlike_add": {
            "tokens": [
                ["text", "\/soundlike-add"]
            ],
            "defaults": {
                "_locale": "en"
            },
            "requirements": [],
            "hosttokens": [
                ["text", ".akinator.mobi"],
                ["variable", "", "[^\\.]++", "_locale"]
            ],
            "methods": [],
            "schemes": []
        },
        "m_ranking_limit": {
            "tokens": [
                ["text", "\/ranking-limit"]
            ],
            "defaults": {
                "_locale": "en"
            },
            "requirements": [],
            "hosttokens": [
                ["text", ".akinator.mobi"],
                ["variable", "", "[^\\.]++", "_locale"]
            ],
            "methods": [],
            "schemes": []
        }
    },
    "prefix": "",
    "host": "en.akinator.com",
    "port": "",
    "scheme": "https",
    "locale": "en"
});