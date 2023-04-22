function getBrazeDigitalData() {
    return { accountKey: trackAccountKey > 0 ? trackAccountKey.toString() : 'not_applicable' };
}

function logPageViewEvent() {
    if (brazeEnabled) {
        var pageViewEventName = getPageViewEventName();
        if (pageViewEventName) {
            if (braze) {
                braze.logCustomEvent(pageViewEventName, getBrazeDigitalData());
            }
        }
    }
}
function bindClickEvents() {
    $(function () {
        $('.brazeEvent').click(function () {
            var eventName = $(this).attr('data-event');
            if (eventName) {
                logClickEvent(eventName);
            }
        });
    });
}
function getPageViewEventName() {
    var currUrlPath = window.location.pathname;
    if (currUrlPath) {
        currUrlPath = currUrlPath.toLowerCase();
    }
    var eventName = '';
    switch (currUrlPath) {
        case '/directdeposit/direct-deposit-enrollment':
            eventName = 'DirectDepositView';
            break;
        case '/account/overdraft-view':
            eventName = 'OverDraftView';
            break;
    }
    return eventName;
}
function logClickEvent(eventName) {
    if (brazeEnabled) {
        if (braze) {
            braze.logCustomEvent(eventName, getBrazeDigitalData());
        }
    }
}
function isMacOS() {
    var ua = navigator.userAgent;
    var isIOS = /iPhone|iPad|iPod/i.test(ua);
    var isSafari = /Safari/.test(ua) && !/Chrome/.test(ua);
    if (isSafari && !isIOS) {
        return true;
    }
    return false;
}
function showSafariPrompt() {
    if (brazeEnabled) {
        if (braze) {
            var currUrlPath = window.location.pathname;
            if (currUrlPath) {
                currUrlPath = currUrlPath.toLowerCase();
            }
            if (currUrlPath == '/login') {
                var currVisit = 1;
                var numberOfVisits = localStorage.getItem('numberOfVisits');
                if (numberOfVisits) {
                    if (!isNaN(numberOfVisits)) {
                        currVisit = parseInt(numberOfVisits);
                        currVisit++;
                    }
                }
                if (currVisit <= 5) {
                    localStorage.setItem('numberOfVisits', currVisit);
                }
                if (currVisit == 1 || currVisit == 5) {
                    braze.logCustomEvent("prime-for-push");
                }
            }
        }
    }
}