
var localization = {
    en: {
        title: "Sample from Beta Distribution",
        navigation: "Sample from Beta Distribution",
        entrdsname: "Enter name for dataset",
        shape1: "Shape 1",
        shape2: "Shape 2",
        lblnoofsamples:  "Number of samples (rows)",
        lblnoofobsv: "Number of observations (columns)",
        lblseed: "Seed",
        lblAddtoDS: "Add to dataset",
        chklbl1:"Sample means",
        chklbl2:"Sample sums",
        chklbl3:"Sample standard deviations",
        help: {
            title: "Sample from Beta Distribution",
            r_help: "help(rbeta, package=stats)",
            body: `
            <b>Description</b>
<br/>
Density, distribution function, quantile function and random generation for the Beta distribution with parameters shape1 and shape2 (and optional non-centrality parameter ncp).
<br/>
<b>Usage</b>
<br/>
<code>
    dbeta(x, shape1, shape2, ncp = 0, log = FALSE)
    <br/>
    pbeta(q, shape1, shape2, ncp = 0, lower.tail = TRUE, log.p = FALSE)
    <br/>
    qbeta(p, shape1, shape2, ncp = 0, lower.tail = TRUE, log.p = FALSE)
    <br/>
    rbeta(n, shape1, shape2, ncp = 0)
    <br/>
</code>

<br/><b>Arguments</b>
<br/>
<ul>
    <li>x, q : vector of quantiles.</li>
    
    
    <li>p : vector of probabilities.</li>
    
    
    <li>n : number of observations. If length(n) > 1, the length is taken to be the number required.</li>
    
    
    <li>shape1, shape2 : non-negative parameters of the Beta distribution.</li>
    
    
    <li>ncp : non-centrality parameter.</li>
    
    
    <li>log, log.p : logical; if TRUE, probabilities p are given as log(p).</li>
    
    
    <li>lower.tail : logical; if TRUE (default), probabilities are P[X ≤ x], otherwise, P[X > x].</li>
    
</ul>



<br/>
<b>Details</b>
<br/>
The Beta distribution with parameters shape1 = a and shape2 = b has density
<br/>
<code>Γ(a+b)/(Γ(a)Γ(b))x^(a-1)(1-x)^(b-1)</code>
<br/>
for a > 0, b > 0 and 0 ≤ x ≤ 1 where the boundary values at x=0 or x=1 are defined as by continuity (as limits). 
<br/>
 The mean is a/(a+b) and the variance is ab/((a+b)^2 (a+b+1)). These moments and all distributional properties can be defined as limits (leading to point masses at 0, 1/2, or 1) when a or b are zero or infinite, and the corresponding [dpqr]beta() functions are defined correspondingly.
 <br/>
pbeta is closely related to the incomplete beta function. As defined by Abramowitz and Stegun 6.6.1
<br/>
<code>B_x(a,b) = integral_0^x t^(a-1) (1-t)^(b-1) dt,</code>
<br/>
and 6.6.2 I_x(a,b) = B_x(a,b) / B(a,b) where B(a,b) = B_1(a,b) is the Beta function (beta).
<br/>
<code>I_x(a,b) is pbeta(x, a, b).</code>
<br/>
The noncentral Beta distribution (with ncp = λ) is defined (Johnson et al, 1995, pp. 502) as the distribution of X/(X+Y) where X ~ chi^2_2a(λ) and Y ~ chi^2_2b.
<br/>
<br/><b>Value</b>
<br/>
dbeta gives the density, pbeta the distribution function, qbeta the quantile function, and rbeta generates random deviates.
<br/>
Invalid arguments will result in return value NaN, with a warning.
<br/>
The length of the result is determined by n for rbeta, and is the maximum of the lengths of the numerical arguments for the other functions.
<br/>
The numerical arguments other than n are recycled to the length of the result. Only the first elements of the logical arguments are used.
<br/>
<br/><b>Note</b>
<br/>
Supplying ncp = 0 uses the algorithm for the non-central distribution, which is not the same algorithm used if ncp is omitted. This is to give consistent behaviour in extreme cases with values of ncp very near zero.
`}
    }
}




class sampleBetaDistribution extends baseModal {
    constructor() {
        var config = {
            id: "sampleBetaDistribution",
            label: localization.en.title,
            modalType: "one",
            RCode: `
            base::set.seed({{selected.seedval | safe}})

            {{selected.datasetname | safe}} <- as.data.frame(matrix(stats::rbeta({{selected.noofsamples | safe}}*{{selected.noofobsrv | safe}}, shape1={{selected.shape1 | safe}}, shape2={{selected.shape2 | safe}}), ncol={{selected.noofobsrv | safe}}))
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
            BSkyFormat({{selected.datasetname | safe}}, engNotationSetting=BSkyGetEngNotationSetting(), singleTableOutputHeader="Samples from Beta Distribution")
            
            BSkyLoadRefreshDataframe('{{selected.datasetname | safe}}')
                `
        }
        var objects = {
            datasetname: {
                el: new input(config, {
                    no: 'datasetname',
                    label: localization.en.entrdsname,
                    required: true,
                    placeholder: "BetaSamples",
                    extraction: "TextAsIs",
                    type: "character",
                    overwrite: "dataset",
                    value: "BetaSamples"
                })
            },
            shape1: {
                el: new input(config, {
                    no: 'shape1',
                    label: localization.en.shape1,
                    required: true,
                    placeholder: "0",
                    allow_spaces:true,
                    type : "numeric",
                    extraction: "TextAsIs",
                    value: "0"
                })
            },
            shape2: {
                el: new input(config, {
                    no: 'shape2',
                    label: localization.en.shape2,
                    required: true,
                    placeholder: "0",
                    allow_spaces:true,
                    type : "numeric",
                    extraction: "TextAsIs",
                    value: "0"
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
                    value: 100,
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
                    value: 1,
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
            items: [objects.datasetname.el.content, objects.shape1.el.content, objects.shape2.el.content, 
                objects.noofsamples.el.content, objects.noofobsrv.el.content, objects.seedval.el.content,
                objects.labelAddToDs.el.content, objects.smplmeans.el.content, objects.smplsums.el.content, objects.smplsd.el.content
            ],
            nav: {
                name: localization.en.navigation,
                icon: "icon-beta_s",
                datasetRequired: false,
                modal: config.id
            }
        }
        super(config, objects, content);
        this.help = localization.en.help;
    }
}
module.exports.item = new sampleBetaDistribution().render()