
var localization = {
    en: {
        title: "Sample from t Distribution",
        navigation: "Sample from t Distribution",
        entrdsname: "Enter name for dataset",
        degoffree: "Degrees of freedom",
        lblnoofsamples:  "Number of samples (rows)",
        lblnoofobsv: "Number of observations (columns)",
        lblseed: "Seed",
        lblAddtoDS: "Add to dataset",
        chklbl1:"Sample means",
        chklbl2:"Sample sums",
        chklbl3:"Sample standard deviations",
        help: {
            title: "Sample from t Distribution",
            r_help: "help(rt, package=stats)",
            body: `
            ​​
            <b>Description</b>
            <br/>
            Density, distribution function, quantile function and random generation for the t distribution with df degrees of freedom (and optional non-centrality parameter ncp).
            <br/>
            <b>Usage</b>
            <br/>
            <code>
                dt(x, df, ncp, log = FALSE)
                <br/>
                pt(q, df, ncp, lower.tail = TRUE, log.p = FALSE)
                <br/>
                qt(p, df, ncp, lower.tail = TRUE, log.p = FALSE)
                <br/>
                rt(n, df, ncp)
                <br/>
            </code>
            <br/>
            <b>Arguments</b>
            <br/>
            <ul>
                <li>x, q : vector of quantiles.</li>
                
                
                <li>p : vector of probabilities.</li>
                
                
                <li>n : number of observations. If length(n) > 1, the length is taken to be the number required.</li>
                
                
                <li>df : degrees of freedom (> 0, maybe non-integer). df = Inf is allowed.</li>
                
                
                <li>ncp : non-centrality parameter delta; currently except for rt(), only for abs(ncp) <= 37.62. If omitted, use the central t distribution.</li>
                
                
                <li>log, log.p : logical; if TRUE, probabilities p are given as log(p).</li>
                
                
                <li>lower.tail : logical; if TRUE (default), probabilities are P[X ≤ x], otherwise, P[X > x].</li>
            </ul>
            
            
            
            <br/>
            <b>Details</b>
            <br/>
            The t distribution with df = n degrees of freedom has density
            <br/>
            <code>f(x) = Γ((n+1)/2) / (√(n π) Γ(n/2)) (1 + x^2/n)^-((n+1)/2)</code>
            <br/>
            for all real x. It has mean 0 (for n > 1) and variance n/(n-2) (for n > 2).
            <br/>
            The general non-central t with parameters (df, Del) = (df, ncp) is defined as the distribution of T(df, Del) := (U + Del) / √(V/df) where U and V are independent random variables, U ~ N(0,1) and V ~ χ^2(df) (see Chisquare).
            <br/>
            The most used applications are power calculations for t-tests:
             Let T= (mX - m0) / (S/sqrt(n)) where mX is the mean and S the sample standard deviation (sd) of X_1, X_2, …, X_n which are i.i.d. N(μ, σ^2) Then T is distributed as non-central t with df= n - 1 degrees of freedom and non-centrality parameter ncp = (μ - m0) * sqrt(n)/σ.
             <br/>
            <br/><b>Value</b>
            <br/>
            dt gives the density, pt gives the distribution function, qt gives the quantile function, and rt generates random deviates.
            <br/>
            Invalid arguments will result in return value NaN, with a warning.
            <br/>
            The length of the result is determined by n for rt, and is the maximum of the lengths of the numerical arguments for the other functions.
            <br/>
            The numerical arguments other than n are recycled to the length of the result. Only the first elements of the logical arguments are used.
            <br/>
            <br/><b>Note</b>
            <br/>
            Supplying ncp = 0 uses the algorithm for the non-central distribution, which is not the same algorithm used if ncp is omitted. This is to give consistent behaviour in extreme cases with values of ncp very near zero.
            <br/>
            The code for non-zero ncp is principally intended to be used for moderate values of ncp: it will not be highly accurate, especially in the tails, for large values.            
`}
    }
}




class sampletDistribution extends baseModal {
    constructor() {
        var config = {
            id: "sampletDistribution",
            label: localization.en.title,
            modalType: "one",
            RCode: `
            base::set.seed({{selected.seedval | safe}})

            {{selected.datasetname | safe}} <- as.data.frame(matrix(stats::rt({{selected.noofsamples | safe}}*{{selected.noofobsrv | safe}}, df={{selected.degoffree | safe}}), ncol={{selected.noofobsrv | safe}}))
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
            BSkyFormat({{selected.datasetname | safe}}, engNotationSetting=BSkyGetEngNotationSetting(), singleTableOutputHeader="Samples from t Distribution")
            
            BSkyLoadRefreshDataframe('{{selected.datasetname | safe}}')
                `
        }
        var objects = {
            datasetname: {
                el: new input(config, {
                    no: 'datasetname',
                    label: localization.en.entrdsname,
                    required: true,
                    placeholder: "tSamples",
                    extraction: "TextAsIs",
                    type: "character",
                    overwrite: "dataset",
                    value: "tSamples"
                })
            },
            degoffree: {
                el: new input(config, {
                    no: 'degoffree',
                    label: localization.en.degoffree,
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
            items: [objects.datasetname.el.content, objects.degoffree.el.content,  
                objects.noofsamples.el.content, objects.noofobsrv.el.content, objects.seedval.el.content,
                objects.labelAddToDs.el.content, objects.smplmeans.el.content, objects.smplsums.el.content, objects.smplsd.el.content
            ],
            nav: {
                name: localization.en.navigation,
                icon: "icon-tumblr-s",
                datasetRequired: false,
                modal: config.id
            }
        }
        super(config, objects, content);
        this.help = localization.en.help;
    }
}
module.exports.item = new sampletDistribution().render()