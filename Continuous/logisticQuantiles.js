
var localization = {
    en: {
        title: "Logistic Quantiles",
        navigation: "Logistic Quantiles",
        prob: "Enter probabilities separated by a comma. Example: 0.3,0.2,0.5",
        location: "Location",
        scale: "Scale",
        labelSig: "Significance level",
        lowtail: "Lower tail",
        uptail: "Upper tail",
        help: {
            title: "Logistic Quantiles",
            r_help: "help(qlogis, package=stats)",
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




class logisticQuantiles extends baseModal {
    constructor() {
        var config = {
            id: "glogisticQuantiles",
            label: localization.en.title,
            modalType: "one",
            RCode: `
            local(
                {
                result =  stats::qlogis(c({{selected.prob | safe}}), location={{selected.location | safe}}, scale={{selected.scale | safe}}, lower.tail={{selected.a | safe}} )
                print(result)
                }
                )
                `
        }
        var objects = {
            prob: {
                el: new input(config, {
                    no: 'prob',
                    label: localization.en.prob,
                    required: true,
                    placeholder: "",
                    extraction: "TextAsIs",
                    allow_spaces:true,
                    value: ""
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
            labelSig: { el: new labelVar(config, { label: localization.en.labelSig, style: "mt-3",h: 6 }) },
            lowtail: { el: new radioButton(config, { label: localization.en.lowtail, no: "a", increment: "TRUE", value: "TRUE", state: "checked", extraction: "ValueAsIs" }) },
            uptail: { el: new radioButton(config, { label: localization.en.uptail, no: "a", increment: "FALSE", value: "FALSE", state: "", extraction: "ValueAsIs" }) }
        }
        const content = {
            items: [objects.prob.el.content, objects.location.el.content, objects.scale.el.content, objects.labelSig.el.content, objects.lowtail.el.content, objects.uptail.el.content],
            nav: {
                name: localization.en.navigation,
                icon: "icon-logistic_white_comp-q",
                datasetRequired: false,
                modal: config.id
            }
        }
        super(config, objects, content);
        this.help = localization.en.help;
    }
}
module.exports.item = new logisticQuantiles().render()