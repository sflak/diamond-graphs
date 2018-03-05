const createTimeChart = (data) => {
        var domEl = 'graph-section';

        var contentarray = [];
        for(i=0; i<data.length; i++){
            var orig = data[i][0].split('-');
            var conv = new Date(orig[0], orig[1]-1, orig[2], orig[3], orig[4]);
            var fin = conv.getTime();
            
            const ele = {
                value: fin
                // color: "#2484c1"
            };
            contentarray.push(ele);    
        }
        console.log(contentarray);

        // var data = [{'value': 1380854103662},{'value': 1363641921283}
        //     ,{'value': 1361111111183}];
        var brushEnabled = false;
        var tseries = new timeseries(domEl, contentarray, brushEnabled, "graph-section");
    }