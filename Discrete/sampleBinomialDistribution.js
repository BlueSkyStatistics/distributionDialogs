
var localization = {
    en: {
        title: "Sample from Binomial Distribution",
        navigation: "Sample from Binomial Distribution",
        entrdsname: "Enter name for dataset",
        size: "Binomial trials",
        prob: "Probability",
        lblnoofsamples:  "Number of samples (rows)",
        lblnoofobsv: "Number of observations (columns)",
        lblseed: "Seed",
        lblAddtoDS: "Add to dataset",
        chklbl1:"Sample means",
        chklbl2:"Sample sums",
        chklbl3:"Sample standard deviations",
        help: {
            title: "Sample from Binomial Distribution",
            r_help:"help(rbinom, package=stats)",
            body:`
            <b>Description</b>
            <br/>
Density, distribution function, quantile function and random generation for the binomial distribution with parameters size and prob.
<br/>
This is conventionally interpreted as the number of ‘successes’ in size trials.
<br/>
<b>Usage</b>
<br/>
<code>
    dbinom(x, size, prob, log = FALSE)
    <br/>
    pbinom(q, size, prob, lower.tail = TRUE, log.p = FALSE)
    <br/>
    qbinom(p, size, prob, lower.tail = TRUE, log.p = FALSE)
    <br/>
    rbinom(n, size, prob)
    <br/>
</code>
<br/>
<b>Arguments</b>
<br/>
<ul>
    <li>x, q : vector of quantiles.</li>
    
    
    <li>p : vector of probabilities.</li>
    
    
    <li>n : number of observations. If length(n) > 1, the length is taken to be the number required.</li>
    
    
    <li>size : number of trials (zero or more).</li>
    
    
    <li>prob : probability of success on each trial.</li>
    
    
    <li>log, log.p : logical; if TRUE, probabilities p are given as log(p).</li>
    
    
    <li>lower.tail : logical; if TRUE (default), probabilities are P[X ≤ x], otherwise, P[X > x].</li>
</ul>



<br/>
<b>Details</b>
<br/>
The binomial distribution with size = n and prob = p has density
<br/>
<code> p(x) = choose(n, x) p^x (1-p)^(n-x) </code>
<br/>
for x = 0, …, n. Note that binomial coefficients can be computed by choose in R.
<br/>
If an element of x is not integer, the result of dbinom is zero, with a warning.
<br/>
p(x) is computed using Loader's algorithm, see the reference below.
<br/>
The quantile is defined as the smallest value x such that F(x) ≥ p, where F is the distribution function.
<br/>
<br/><b>Value</b>
<br/>
dbinom gives the density, pbinom gives the distribution function, qbinom gives the quantile function and rbinom generates random deviates.
<br/>
If size is not an integer, NaN is returned.
<br/>
The length of the result is determined by n for rbinom, and is the maximum of the lengths of the numerical arguments for the other functions.
<br/>
The numerical arguments other than n are recycled to the length of the result. Only the first elements of the logical arguments are used.
   `
        }
    }
}




class sampleBinomialDistribution extends baseModal {
    constructor() {
        var config = {
            id: "sampleBinomialDistribution",
            label: localization.en.title,
            modalType: "one",
            RCode: `
            base::set.seed({{selected.seedval | safe}})

            {{selected.datasetname | safe}} <- as.data.frame(matrix(stats::rbinom({{selected.noofsamples | safe}}*{{selected.noofobsrv | safe}}, size={{selected.size | safe}}, prob={{selected.prob | safe}}), ncol={{selected.noofobsrv | safe}}))
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
            BSkyFormat({{selected.datasetname | safe}}, engNotationSetting=BSkyGetEngNotationSetting(), singleTableOutputHeader="Samples from Binomial Distribution")
            
            BSkyLoadRefreshDataframe('{{selected.datasetname | safe}}')
                `
        }
        var objects = {
            datasetname: {
                el: new input(config, {
                    no: 'datasetname',
                    label: localization.en.entrdsname,
                    required: true,
                    placeholder: "BinomialSamples",
                    extraction: "TextAsIs",
                    type: "character",
                    overwrite: "dataset",
                    value: "BinomialSamples"
                })
            },
            size: {
                el: new input(config, {
                    no: 'size',
                    label: localization.en.size,
                    required: true,
                    placeholder: "0",
                    allow_spaces:true,
                    type : "numeric",
                    extraction: "TextAsIs",
                    value: "0"
                })
            },
            prob: {
                el: new input(config, {
                    no: 'prob',
                    label: localization.en.prob,
                    required: true,
                    placeholder: "0.1",
                    allow_spaces:true,
                    type : "numeric",
                    extraction: "TextAsIs",
                    value: ""
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
            items: [objects.datasetname.el.content, objects.size.el.content, objects.prob.el.content, 
                objects.noofsamples.el.content, objects.noofobsrv.el.content, objects.seedval.el.content,
                objects.labelAddToDs.el.content, objects.smplmeans.el.content, objects.smplsums.el.content, objects.smplsd.el.content
            ],
            nav: {
                name: localization.en.navigation,
                icon: "icon-binary-code-s",
                datasetRequired: false,
                modal: config.id
            }
        }
        super(config, objects, content);
        this.help = localization.en.help;
    }
}
module.exports.item = new sampleBinomialDistribution().render()