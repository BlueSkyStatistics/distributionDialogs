
var localization = {
    en: {
        title: "Sample from Negative Binomial Distribution",
        navigation: "Sample from Negative Binomial Distribution",
        entrdsname: "Enter name for dataset",
        size: "Target number of successes",
        prob: "Probability",
        lblnoofsamples:  "Number of samples (rows)",
        lblnoofobsv: "Number of observations (columns)",
        lblseed: "Seed",
        lblAddtoDS: "Add to dataset",
        chklbl1:"Sample means",
        chklbl2:"Sample sums",
        chklbl3:"Sample standard deviations",
        help: {
            title: "Sample from Negative Binomial Distribution",
            r_help: "help(rnbinom, package=stats)",
            body: `

            <b>Description</b>
            <br/>
            Density, distribution function, quantile function and random generation for the negative binomial distribution with parameters size and prob.
            <br/>
            <b>Usage</b>
            <br/>
            <code>
                dnbinom(x, size, prob, mu, log = FALSE)
                <br/>
                pnbinom(q, size, prob, mu, lower.tail = TRUE, log.p = FALSE)
                <br/>
                qnbinom(p, size, prob, mu, lower.tail = TRUE, log.p = FALSE)
                <br/>
                rnbinom(n, size, prob, mu)
                <br/>
            </code>
            <br/>
            <b>Arguments</b>
            <br/>
            <ul>
                <li>x : vector of (non-negative integer) quantiles.</li>
                
                
                <li>q : vector of quantiles.</li>
                
                
                <li>p : vector of probabilities.</li>
                
                
                <li>n : number of observations. If length(n) > 1, the length is taken to be the number required.</li>
                
                
                <li>size : target for number of successful trials, or dispersion parameter (the shape parameter of the gamma mixing distribution). Must be strictly positive, need not be integer.</li>
                
                
                <li>prob : probability of success in each trial. 0 < prob <= 1.</li>
                
                
                <li>mu : alternative parametrization via mean: see ‘Details’.</li>
                
                
                <li>log, log.p : logical; if TRUE, probabilities p are given as log(p).</li>
                
                
                <li>lower.tail : logical; if TRUE (default), probabilities are P[X ≤ x], otherwise, P[X > x].</li>
            </ul>
            
            
            
            <br/>
            <b>Details</b>
            <br/>
            The negative binomial distribution with size = n and prob = p has density
            <br/>
            <code>
                Γ(x+n)/(Γ(n) x!) p^n (1-p)^x
                for x = 0, 1, 2, …, n > 0 and 0 < p ≤ 1.
            </code>
            <br/>
            This represents the number of failures which occur in a sequence of Bernoulli trials before a target number of successes is reached. The mean is μ = n(1-p)/p and variance n(1-p)/p^2.
            <br/>
            A negative binomial distribution can also arise as a mixture of Poisson distributions with mean distributed as a gamma distribution (see pgamma) with scale parameter (1 - prob)/prob and shape parameter size. (This definition allows non-integer values of size.)
            <br/>
            An alternative parametrization (often used in ecology) is by the mean mu (see above), and size, the dispersion parameter, where prob = size/(size+mu). The variance is mu + mu^2/size in this parametrization.
            <br/>
            If an element of x is not integer, the result of dnbinom is zero, with a warning.
            The case size == 0 is the distribution concentrated at zero. This is the limiting distribution for size approaching zero, even if mu rather than prob is held constant. Notice though, that the mean of the limit distribution is 0, whatever the value of mu.
            <br/>
            The quantile is defined as the smallest value x such that F(x) ≥ p, where F is the distribution function.
            <br/>
            <br/><b>Value</b>
            <br/>
            dnbinom gives the density, pnbinom gives the distribution function, qnbinom gives the quantile function, and rnbinom generates random deviates.
            <br/>
            Invalid size or prob will result in return value NaN, with a warning.
            <br/>
            The length of the result is determined by n for rnbinom, and is the maximum of the lengths of the numerical arguments for the other functions.
            <br/>
            The numerical arguments other than n are recycled to the length of the result. Only the first elements of the logical arguments are used.            
`}
    }
}




class sampleNegativeBinomialDistribution extends baseModal {
    constructor() {
        var config = {
            id: "sampleNegativeBinomialDistribution",
            label: localization.en.title,
            modalType: "one",
            RCode: `
            base::set.seed({{selected.seedval | safe}})

            {{selected.datasetname | safe}} <- as.data.frame(matrix(stats::rnbinom({{selected.noofsamples | safe}}*{{selected.noofobsrv | safe}}, size={{selected.size | safe}}, prob={{selected.prob | safe}}), ncol={{selected.noofobsrv | safe}}))
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
            BSkyFormat({{selected.datasetname | safe}}, engNotationSetting=BSkyGetEngNotationSetting(), singleTableOutputHeader="Samples from Negative Binomial Distribution")
            
            BSkyLoadRefreshDataframe('{{selected.datasetname | safe}}')
                `
        }
        var objects = {
            datasetname: {
                el: new input(config, {
                    no: 'datasetname',
                    label: localization.en.entrdsname,
                    required: true,
                    placeholder: "NegativeBinomialSamples",
                    extraction: "TextAsIs",
                    type: "character",
                    overwrite: "dataset",
                    value: "NegativeBinomialSamples"
                })
            },
            size: {
                el: new input(config, {
                    no: 'size',
                    label: localization.en.size,
                    required: true,
                    placeholder: "1",
                    allow_spaces:true,
                    type : "numeric",
                    extraction: "TextAsIs",
                    value: "1"
                })
            },
            prob: {
                el: new input(config, {
                    no: 'prob',
                    label: localization.en.prob,
                    required: true,
                    placeholder: "0.5",
                    allow_spaces:true,
                    type : "numeric",
                    extraction: "TextAsIs",
                    value: "0.5"
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
                icon: "icon-negtive-binary-code-s",
                datasetRequired: false,
                modal: config.id
            }
        }
        super(config, objects, content);
        this.help = localization.en.help;
    }
}
module.exports.item = new sampleNegativeBinomialDistribution().render()