
var localization = {
    en: {
        title: "Sample from Hypergeometric Distribution",
        navigation: "Sample from Hypergeometric Distribution",
        entrdsname: "Enter name for dataset",
        m: "m (number of white balls in the urn)",
        n: "n (number of black balls in the urn)",
        k: "k (number of balls drawn from the urn)",
        lblnoofsamples:  "Number of samples (rows)",
        lblnoofobsv: "Number of observations (columns)",
        lblseed: "Seed",
        lblAddtoDS: "Add to dataset",
        chklbl1:"Sample means",
        chklbl2:"Sample sums",
        chklbl3:"Sample standard deviations",
        help: {
            title: "Sample from Hypergeometric Distribution",
            r_help: "help(rhyper, package=stats)",
            body: `

            <b>Description</b>
            <br/>
            Density, distribution function, quantile function and random generation for the hypergeometric distribution.
            <br/>
            <b>Usage</b>
            <br/>
            <code>
                dhyper(x, m, n, k, log = FALSE)
                <br/>
                phyper(q, m, n, k, lower.tail = TRUE, log.p = FALSE)
                <br/>
                qhyper(p, m, n, k, lower.tail = TRUE, log.p = FALSE)
                <br/>
                rhyper(nn, m, n, k)
                <br/>
            </code>
            <br/>
            <b>Arguments</b>
            <br/>
            <ul>
                <li>x, q : vector of quantiles representing the number of white balls drawn without replacement from an urn which contains both black and white balls.</li>
                
                
                <li>m : the number of white balls in the urn.</li>
                
                
                <li>n : the number of black balls in the urn.</li>
                
                
                <li>k : the number of balls drawn from the urn.</li>
                
                
                <li>p : probability, it must be between 0 and 1.</li>
                
                
                <li>nn : number of observations. If length(nn) > 1, the length is taken to be the number required.</li>
                
                
                <li>log, log.p : logical; if TRUE, probabilities p are given as log(p).</li>
                
                
                <li>lower.tail : logical; if TRUE (default), probabilities are P[X ≤ x], otherwise, P[X > x].</li>
            </ul>
            
            
            
            <br/>
            <b>Details</b>
            <br/>
            The hypergeometric distribution is used for sampling without replacement. The density of this distribution with parameters m, n and k (named Np, N-Np, and n, respectively in the reference below) is given by
            <br/>
            <code>
                p(x) = choose(m, x) choose(n, k-x) / choose(m+n, k)
                for x = 0, …, k.
            </code>
            <br/>
            Note that p(x) is non-zero only for max(0, k-n) <= x <= min(k, m).
            <br/>
            With p := m/(m+n) (hence Np = N \times p in the reference's notation), the first two moments are mean
            <br/>
            <code>E[X] = μ = k p</code>
            <br/>
            and variance
            <br/>
            <code>Var(X) = k p (1 - p) * (m+n-k)/(m+n-1),</code>
            <br/>
            which shows the closeness to the Binomial(k,p) (where the hypergeometric has smaller variance unless k = 1).
            <br/>
            The quantile is defined as the smallest value x such that F(x) ≥ p, where F is the distribution function.
            <br/>
            If one of m, n, k, exceeds .Machine$integer.max, currently the equivalent of qhyper(runif(nn), m,n,k) is used, when a binomial approximation may be considerably more efficient.
            <br/>
            <br/><b>Value</b>
            <br/>
            dhyper gives the density, phyper gives the distribution function, qhyper gives the quantile function, and rhyper generates random deviates.
            <br/>
            Invalid arguments will result in return value NaN, with a warning.
            <br/>
            The length of the result is determined by n for rhyper, and is the maximum of the lengths of the numerical arguments for the other functions.
            <br/>
            The numerical arguments other than n are recycled to the length of the result. Only the first elements of the logical arguments are used.            
`}
    }
}




class sampleHypergeometricDistribution extends baseModal {
    constructor() {
        var config = {
            id: "sampleHypergeometricDistribution",
            label: localization.en.title,
            modalType: "one",
            RCode: `
            base::set.seed({{selected.seedval | safe}})

            {{selected.datasetname | safe}} <- as.data.frame(matrix(stats::rhyper({{selected.noofsamples | safe}}*{{selected.noofobsrv | safe}}, m={{selected.m | safe}}, n={{selected.n | safe}}, k={{selected.k | safe}}), ncol={{selected.noofobsrv | safe}}))
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
            BSkyFormat({{selected.datasetname | safe}}, engNotationSetting=BSkyGetEngNotationSetting(), singleTableOutputHeader="Samples from Hypergeometric Distribution")
            
            BSkyLoadRefreshDataframe('{{selected.datasetname | safe}}')
                `
        }
        var objects = {
            datasetname: {
                el: new input(config, {
                    no: 'datasetname',
                    label: localization.en.entrdsname,
                    required: true,
                    placeholder: "HypergeometricSamples",
                    extraction: "TextAsIs",
                    type: "character",
                    overwrite: "dataset",
                    value: "HypergeometricSamples"
                })
            },
            m: {
                el: new input(config, {
                    no: 'm',
                    label: localization.en.m,
                    required: true,
                    placeholder: "1",
                    allow_spaces:true,
                    type : "numeric",
                    extraction: "TextAsIs",
                    value: "1"
                })
            },
            n: {
                el: new input(config, {
                    no: 'n',
                    label: localization.en.n,
                    required: true,
                    placeholder: "1",
                    allow_spaces:true,
                    type : "numeric",
                    extraction: "TextAsIs",
                    value: "1"
                })
            },
            k: {
                el: new input(config, {
                    no: 'k',
                    label: localization.en.k,
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
            items: [objects.datasetname.el.content, objects.m.el.content, objects.n.el.content, objects.k.el.content,
                objects.noofsamples.el.content, objects.noofobsrv.el.content, objects.seedval.el.content,
                objects.labelAddToDs.el.content, objects.smplmeans.el.content, objects.smplsums.el.content, objects.smplsd.el.content
            ],
            nav: {
                name: localization.en.navigation,
                icon: "icon-curve-s",
                datasetRequired: false,
                modal: config.id
            }
        }
        super(config, objects, content);
        this.help = localization.en.help;
    }
}
module.exports.item = new sampleHypergeometricDistribution().render()