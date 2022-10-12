
var localization = {
    en: {
        title: "Sample from Lognormal Distribution",
        navigation: "Sample from Lognormal Distribution",
        entrdsname: "Enter name for dataset",
        meanlog: "Mean (log scale)",
        sdlog: "Standard deviation (log scale)",
        lblnoofsamples:  "Number of samples (rows)",
        lblnoofobsv: "Number of observations (columns)",
        lblseed: "Seed",
        lblAddtoDS: "Add to dataset",
        chklbl1:"Sample means",
        chklbl2:"Sample sums",
        chklbl3:"Sample standard deviations",
        help: {
            title: "Sample from Lognormal Distribution",
            r_help: "help(rlnorm, package=stats)",
            body: `
            ​​
            <b>Description</b>
            <br/>
            Density, distribution function, quantile function and random generation for the log normal distribution whose logarithm has mean equal to meanlog and standard deviation equal to sdlog.
            <br/>
            <b>Usage</b>
            <br/>
            <code>
                dlnorm(x, meanlog = 0, sdlog = 1, log = FALSE)
                <br/>
                plnorm(q, meanlog = 0, sdlog = 1, lower.tail = TRUE, log.p = FALSE)
                <br/>
                qlnorm(p, meanlog = 0, sdlog = 1, lower.tail = TRUE, log.p = FALSE)
                <br/>
                rlnorm(n, meanlog = 0, sdlog = 1)
                <br/>
            </code>
            <br/>
            <b>Arguments</b>
            <br/>
            <ul>
                <li>x, q : vector of quantiles.</li>
                
                
                <li>p : vector of probabilities.</li>
                
                
                <li>n : number of observations. If length(n) > 1, the length is taken to be the number required.</li>
                
                
                <li>meanlog, sdlog : mean and standard deviation of the distribution on the log scale with default values of 0 and 1 respectively.</li>
                
                
                <li>log, log.p : logical; if TRUE, probabilities p are given as log(p).</li>
                
                
                <li>lower.tail : logical; if TRUE (default), probabilities are P[X ≤ x], otherwise, P[X > x].</li>
            </ul>
            
            
            
            <br/>
            <b>Details</b>
            <br/>
            The log normal distribution has density
            <br/>
            <code>f(x) = 1/(√(2 π) σ x) e^-((log x - μ)^2 / (2 σ^2))</code>
            <br/>
            where μ and σ are the mean and standard deviation of the logarithm. The mean is E(X) = exp(μ + 1/2 σ^2), the median is med(X) = exp(μ), and the variance Var(X) = exp(2*μ + σ^2)*(exp(σ^2) - 1) and hence the coefficient of variation is sqrt(exp(σ^2) - 1) which is approximately σ when that is small (e.g., σ < 1/2).
            <br/>
            <br/><b>Value</b>
            <br/>
            dlnorm gives the density, plnorm gives the distribution function, qlnorm gives the quantile function, and rlnorm generates random deviates.
            <br/>
            The length of the result is determined by n for rlnorm, and is the maximum of the lengths of the numerical arguments for the other functions.
            <br/>
            The numerical arguments other than n are recycled to the length of the result. Only the first elements of the logical arguments are used.
            <br/>
            <br/><b>Note</b>
            <br/>
            The cumulative hazard H(t) = - log(1 - F(t)) is -plnorm(t, r, lower = FALSE, log = TRUE).            
`}
    }
}




class sampleLognormalDistribution extends baseModal {
    constructor() {
        var config = {
            id: "sampleLognormalDistribution",
            label: localization.en.title,
            modalType: "one",
            RCode: `
            base::set.seed({{selected.seedval | safe}})

            {{selected.datasetname | safe}} <- as.data.frame(matrix( stats::rlnorm({{selected.noofsamples | safe}}*{{selected.noofobsrv | safe}}, meanlog={{selected.meanlog | safe}}, sdlog={{selected.sdlog | safe}}), ncol={{selected.noofobsrv | safe}}))
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
            BSkyFormat({{selected.datasetname | safe}}, engNotationSetting=BSkyGetEngNotationSetting(), singleTableOutputHeader="Samples from Lognormal Distribution")
            
            BSkyLoadRefreshDataframe('{{selected.datasetname | safe}}')
                `
        }
        var objects = {
            datasetname: {
                el: new input(config, {
                    no: 'datasetname',
                    label: localization.en.entrdsname,
                    required: true,
                    placeholder: "LognormalSamples",
                    extraction: "TextAsIs",
                    type: "character",
                    overwrite: "dataset",
                    value: "LognormalSamples"
                })
            },
            meanlog: {
                el: new input(config, {
                    no: 'meanlog',
                    label: localization.en.meanlog,
                    required: true,
                    placeholder: "0",
                    allow_spaces:true,
                    type : "numeric",                    
                    extraction: "TextAsIs",
                    value: "0"
                })
            },
            sdlog: {
                el: new input(config, {
                    no: 'sdlog',
                    label: localization.en.sdlog,
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
            items: [objects.datasetname.el.content, objects.meanlog.el.content, objects.sdlog.el.content, 
                objects.noofsamples.el.content, objects.noofobsrv.el.content, objects.seedval.el.content,
                objects.labelAddToDs.el.content, objects.smplmeans.el.content, objects.smplsums.el.content, objects.smplsd.el.content
            ],
            nav: {
                name: localization.en.navigation,
                icon: "icon-log-normal-distribution-s",
                datasetRequired: false,
                modal: config.id
            }
        }
        super(config, objects, content);
        this.help = localization.en.help;
    }
}
module.exports.item = new sampleLognormalDistribution().render()