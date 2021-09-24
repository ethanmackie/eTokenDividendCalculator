
    function calculateDividends() {

        addSpinner($('body'));
        document.getElementById('result').innerHTML = "Querying the eCash blockchain, please wait approx. 10-15 seconds";

        let ratioSelection;
        if(document.getElementById('prorata').checked) {
            ratioSelection = document.getElementsByName('ratioType')[0].value;
        }else if(document.getElementById('equal').checked) {
            ratioSelection = document.getElementsByName('ratioType')[1].value
        }

        etokenList.Config.SetUrl('https://tokendb.kingbch.com');

        let list;
        (async () => {
          list = await etokenList.List.GetAddressListFor(
          document.getElementById('eTokenIdInput').value,
          Number(document.getElementById('blockHeightInput').value),
          true
        );

        var totalTokenInCirculation = 0;
        var totalHolders = 0;
        list.forEach((index) => totalTokenInCirculation = totalTokenInCirculation + Number(index));
        list.forEach((index) => totalHolders++);

        circToDivRatio = Number(document.getElementById('dividendInput').value)/totalTokenInCirculation;

        var resultString = "";
        if(ratioSelection == 'prorata') {
            list.forEach((element, index) => resultString += convertToEcashAddr(index) + ',' + Number(element)*circToDivRatio + '\n');
        } else if (ratioSelection == 'equal') {

            list.forEach((element, index) => resultString += convertToEcashAddr(index) + ',' + Number(document.getElementById('dividendInput').value)/totalHolders + '\n');
        }

        document.getElementById('result').innerHTML = resultString;

        removeSpinner($('body'));

      })();
    }

    function convertToEcashAddr(eTokenAddr) {
        const { prefix, type, hash,  } = cashaddr.decode(
            eTokenAddr,
        );
        const ecashAddress = cashaddr.encode('ecash', type, hash);
        return ecashAddress;
    }

    function addSpinner(el, static_pos)
    {
        var spinner = el.children('.spinner');
        if (spinner.length && !spinner.hasClass('spinner-remove')) return null;
        !spinner.length && (spinner = $('<div class="spinner' + (static_pos ? '' : ' spinner-absolute') + '"/>').appendTo(el));
        animateSpinner(spinner, 'add');
    }

    function removeSpinner(el, complete)
    {
        var spinner = el.children('.spinner');
        spinner.length && animateSpinner(spinner, 'remove', complete);
    }

    function animateSpinner(el, animation, complete)
    {
        if (el.data('animating')) {
            el.removeClass(el.data('animating')).data('animating', null);
            el.data('animationTimeout') && clearTimeout(el.data('animationTimeout'));
        }
        el.addClass('spinner-' + animation).data('animating', 'spinner-' + animation);
        el.data('animationTimeout', setTimeout(function() { animation == 'remove' && el.remove(); complete && complete(); }, parseFloat(el.css('animation-duration')) * 1000));
    }

    function copyToClipboard() {
      let textarea = document.getElementById("result");
      textarea.select();
      document.execCommand("copy");
    }

    function exportCSV() {
      var a = document.createElement('a');
      with (a) {
        href='data:text/csv;base64,' + btoa(document.getElementById('result').value);
        download='eCashDividend.csv';
      }
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
