
var localization = {
    en: {
        title: "Sample from Logistic Distribution",
        navigation: "Sample from Logistic Distribution",
        entrdsname: "Enter name for dataset",
        location: "Location",
        scale: "Scale",
        lblnoofsamples:  "Number of samples (rows)",
        lblnoofobsv: "Number of observations (columns)",
        lblseed: "Seed",
        lblAddtoDS: "Add to dataset",
        chklbl1:"Sample means",
        chklbl2:"Sample sums",
        chklbl3:"Sample standard deviations",
        help: {
            title: "Sample from Logistic Distribution",
            r_help: "help(rlogis, package=stats)",
            body: `
            ​​
            <b>Description</b>
            <br/>
            Density, distribution function, quantile function and random generation for the logistic distribution with parameters location and scale.
            <br/>
            <b>Usage</b>
            <br/>
            <code>
                dlogis(x, location = 0, scale = 1, log = FALSE)
                <br/>
                plogis(q, location = 0, scale = 1, lower.tail = TRUE, log.p = FALSE)
                <br/>
                qlogis(p, location = 0, scale = 1, lower.tail = TRUE, log.p = FALSE)
                <br/>
                rlogis(n, location = 0, scale = 1)
                <br/>
            </code>
            <br/>
            <b>Arguments</b>
            <br/>
            <ul>
                <li>x, q : vector of quantiles.</li>
                
                
                <li>p : vector of probabilities.</li>
                
                
                <li>n : number of observations. If length(n) > 1, the length is taken to be the number required.</li>
                
                
                <li>location, scale : location and scale parameters.</li>
                
                
                <li>log, log.p : logical; if TRUE, probabilities p are given as log(p).</li>
                
                
                <li>lower.tail : logical; if TRUE (default), probabilities are P[X ≤ x], otherwise, P[X > x].</li>
            </ul>
            
            
            
            <br/>
            <b>Details</b>
            <br/>
            If location or scale are omitted, they assume the default values of 0 and 1 respectively.
            The Logistic distribution with location = m and scale = s has distribution function
            <br/>
            <code>F(x) = 1 / (1 + exp(-(x-m)/s))</code>
            <br/>
            and density
            <br/>
            <code>f(x) = 1/s exp((x-m)/s) (1 + exp((x-m)/s))^-2.</code>
            <br/>
            It is a long-tailed distribution with mean m and variance π^2 /3 s^2.
            <br/>
            <br/><b>Value</b>
            <br/>
            dlogis gives the density, plogis gives the distribution function, qlogis gives the quantile function, and rlogis generates random deviates.
            <br/>
            The length of the result is determined by n for rlogis, and is the maximum of the lengths of the numerical arguments for the other functions.
            <br/>
            The numerical arguments other than n are recycled to the length of the result. Only the first elements of the logical arguments are used.
            <br/>
            <br/><b>Note</b>
            <br/>
            qlogis(p) is the same as the well known ‘logit’ function, logit(p) = log(p/(1-p)), and plogis(x) has consequently been called the ‘inverse logit’.
            <br/>
            The distribution function is a rescaled hyperbolic tangent, plogis(x) == (1+ tanh(x/2))/2, and it is called a sigmoid function in contexts such as neural networks.
            
`} 
    }
}




class sampleLogisticDistribution extends baseModal {
    constructor() {
        var config = {
            id: "sampleLogisticDistribution",
            label: localization.en.title,
            modalType: "one",
            RCode: `
            base::set.seed({{selected.seedval | safe}})

            {{selected.datasetname | safe}} <- as.data.frame(matrix( stats::rlogis({{selected.noofsamples | safe}}*{{selected.noofobsrv | safe}}, location={{selected.location | safe}}, scale={{selected.scale | safe}}), ncol={{selected.noofobsrv | safe}}))
            rownames({{selected.datasetname | safe}}) <- paste("sample", 1:{{selected.noofsamples | safe}}, sep='')
            colnames({{selected.datasetname | safe}}) <- paste("obs", 1:{{selected.noofobsrv | safe}}, sep='')
            {{selected.datasetname | safe}}<- within({{selected.datasetname | safe}}, 
            {  
            #Checking if there is a single row or column
            if ( !({{selected.noofobsrv | safe}} == 1 || {{selected.noofsamples | safe}} ==1 ) )
            {
            if({{selected.smplmeans | safe}}) mean <- rowMeans({{selected.datasetname | safe}}[,1:{{selected.noofobsrv | safe}}]) 
            if({{selected.smplsums | safe}}) sum <- rowSums({{selected.datasetname | safe}}[,1:{{selected.noofobsrv | safe}}])
            if({{selected.smplsd | safe}}) sd <- apply({{selected.datasetname | safe}}[,1:{{selected.noofobsrv | safe}}], 1, sd)
            }
            else
            {
            cat ("We don't calculate sample mean, sum or standard deviation when there is a single row or column")
            }
            })
            BSkyFormat({{selected.datasetname | safe}}, engNotationSetting=BSkyGetEngNotationSetting(), singleTableOutputHeader="Samples from Logistic Distribution")
            
            BSkyLoadRefreshDataframe('{{selected.datasetname | safe}}')
                `
        }
        var objects = {
            datasetname: {
                el: new input(config, {
                    no: 'datasetname',
                    label: localization.en.entrdsname,
                    required: true,
                    placeholder: "LogisticSamples",
                    extraction: "TextAsIs",
                    type: "character",
                    overwrite: "dataset",
                    value: "LogisticSamples"
                })
            },
            location: {
                el: new input(config, {
                    no: 'location',
                    label: localization.en.location,
                    required: true,
                    placeholder: "0",
                    allow_spaces:true,
                    type : "numeric",                    
                    extraction: "TextAsIs",
                    value: "0"
                })
            },
            scale: {
                el: new input(config, {
                    no: 'scale',
                    label: localization.en.scale,
                    required: true,
                    placeholder: "1",
                    allow_spaces:true,
                    type : "numeric",                    
                    extraction: "TextAsIs",
                    value: "1"
                })
            },
            noofsamples: {
                el: new inputSpinner(config, {
                    no: 'noofsamples',
                    label: localization.en.lblnoofsamples,
                    min: 1,
                    max: 9999999,
                    step: 1,
                    style: "mt-3",
                    value: 1,
                    extraction: "NoPrefix|UseComma"
                })
            },            
            noofobsrv: {
                el: new inputSpinner(config, {
                    no: 'noofobsrv',
                    label: localization.en.lblnoofobsv,
                    min: 1,
                    max: 9999999,
                    step: 1,
                    style: "mt-3",                    
                    value: 100,
                    extraction: "NoPrefix|UseComma"
                })
            }, 
            seedval: {
                el: new inputSpinner(config, {
                    no: 'seedval',
                    label: localization.en.lblseed,
                    min: 1,
                    max: 9999999,
                    step: 1,
                    style: "mt-3",                    
                    value: 12345,
                    extraction: "NoPrefix|UseComma"
                })
            },                         
            labelAddToDs: { el: new labelVar(config, { label: localization.en.lblAddtoDS, style: "mt-3",h: 5 }) },
            smplmeans: { el: new checkbox(config, { label: localization.en.chklbl1, no: "smplmeans", state:"checked", extraction: "Boolean", newline: true }) },
            smplsums: { el: new checkbox(config, { label: localization.en.chklbl2, no: "smplsums", extraction: "Boolean", newline: true}) },
            smplsd: { el: new checkbox(config, { label: localization.en.chklbl3, no: "smplsd", extraction: "Boolean", newline: true}) },
        }
        const content = {
            items: [objects.datasetname.el.content, objects.location.el.content, objects.scale.el.content, 
                objects.noofsamples.el.content, objects.noofobsrv.el.content, objects.seedval.el.content,
                objects.labelAddToDs.el.content, objects.smplmeans.el.content, objects.smplsums.el.content, objects.smplsd.el.content
            ],
            nav: {
                name: localization.en.navigation,
                icon: "icon-logistic_white_comp-s",
                datasetRequired: false,
                modal: config.id
            }
        }
        super(config, objects, content);
        this.help = localization.en.help;
    }
}
module.exports.item = new sampleLogisticDistribution().render()