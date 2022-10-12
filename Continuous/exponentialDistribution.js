
var localization = {
    en: {
        title: "Exponential Distribution Plot",
        navigation: "Exponential Distribution Plot",

        rate: "Rate",

        pdenfun: "Plot density function",
        pdstfun: "Plot distribution function",
        lblregions: "Optionally specify regions under the density function by",
        xvals : "x-values",
        quantiles : "quantiles",
        lblRegFill : "Regions to fill (specify one or two, or leave blank)",
        lblreg1 : "Region 1 :",
        lblreg2 : "Region 2 :",
        lblregfrm : "From",
        lblregto : "To",
        lblregcol : "Color",
        lblLegPos: "Position of legend",
        toprt: "Top right",
        toplt: "Top left",
        topmid: "Top center",
        help: {
            title: "Exponential Distribution Plot",
            r_help: "help(qexp, package=stats)",
            body: `
            ​​
            <b>Description</b>
            <br/>
            Density, distribution function, quantile function and random generation for the exponential distribution with rate rate (i.e., mean 1/rate).
            <br/>
            Usage
            <br/>
            <code>
                dexp(x, rate = 1, log = FALSE)
                <br/>
                pexp(q, rate = 1, lower.tail = TRUE, log.p = FALSE)
                <br/>
                qexp(p, rate = 1, lower.tail = TRUE, log.p = FALSE)
                <br/>
                rexp(n, rate = 1)
                <br/>
            </code>
            <br/>
            <b>Arguments</b>
            <br/>
            <ul>
                <li>x, q : vector of quantiles.</li>
                
                
                <li>p : vector of probabilities.</li>
                
                
                <li>n : number of observations. If length(n) > 1, the length is taken to be the number required.</li>
                
                
                <li>rate : vector of rates.</li>
                
                
                <li>log, log.p : logical; if TRUE, probabilities p are given as log(p).</li>
                
                
                <li>lower.tail : logical; if TRUE (default), probabilities are P[X ≤ x], otherwise, P[X > x].</li>
            </ul>
            
            
            
            <br/>
            <b>Details</b>
            <br/>
            If rate is not specified, it assumes the default value of 1.
            <br/>
            The exponential distribution with rate λ has density
            <br/>
            <code>f(x) = λ {e}^{- λ x}</code>
            <br/>
            for x ≥ 0.
            <br/>
            <br/><b>Value</b>
            <br/>
            dexp gives the density, pexp gives the distribution function, qexp gives the quantile function, and rexp generates random deviates.
            <br/>
            The length of the result is determined by n for rexp, and is the maximum of the lengths of the numerical arguments for the other functions.
            <br/>
            The numerical arguments other than n are recycled to the length of the result. Only the first elements of the logical arguments are used.
            <br/>
            <br/><b>Note</b>
            <br/>
            The cumulative hazard H(t) = - log(1 - F(t)) is -pexp(t, r, lower = FALSE, log = TRUE).            
`}        
    }
}




class exponentialDistributionPlot extends baseModal {
    constructor() {
        var config = {
            id: "exponentialDistributionPlot",
            label: localization.en.title,
            modalType: "one",
            RCode: `
            local(
                {
                #Generating the sequence of length 1000,the lower and upper bounds of the sequence are computed using the quantile function of the Exponential distribution  (qexp)  with p=0.0005 and p=0.9995 respectively 
                lowProbBound =0.0005
                upperProbBound=0.9995
                lowerbound =stats::qexp(p=lowProbBound,rate={{selected.rate | safe}})
                upperbound =stats::qexp(p=upperProbBound,rate={{selected.rate | safe}})
                .x <- seq(lowerbound,upperbound,length.out=1000)  

                regionslist=NULL
                if(!is.na(as.numeric('{{selected.reg1frm | safe}}')) && !is.na(as.numeric('{{selected.reg1to | safe}}')) && !is.na(as.numeric('{{selected.reg2frm | safe}}')) && !is.na(as.numeric('{{selected.reg2to | safe}}')) )
                {
                    regionslist = list(c({{selected.reg1frm | safe}}, {{selected.reg1to | safe}}),c({{selected.reg2frm | safe}}, {{selected.reg2to | safe}}) )
                }
                else if(!is.na(as.numeric('{{selected.reg1frm | safe}}')) && !is.na(as.numeric('{{selected.reg1to | safe}}')))
                {
                        regionslist = list(c({{selected.reg1frm | safe}},{{selected.reg1to | safe}}))
                }
                
                #Plot a density function
                if({{selected.a | safe}})
                {
                  RcmdrMisc::plotDistr(.x,stats::dexp(.x,rate={{selected.rate | safe}}),cdf=FALSE,xlab="x",ylab="Density",main=paste("Exponential Distribution:  Rate={{selected.rate | safe}}"),regions=regionslist,col=c('{{selected.reg1col | safe}}','{{selected.reg2col | safe}}'),legend.pos='{{selected.c | safe}}'  )
                }
                else
                {
                  RcmdrMisc::plotDistr(.x,stats::pexp(.x,rate={{selected.rate | safe}}),cdf=TRUE,xlab="x",ylab="Cumulative Probability",main=paste("Exponential Distribution:  Rate={{selected.rate | safe}}"),regions=regionslist,col=c('{{selected.reg1col | safe}}','{{selected.reg2col | safe}}'),legend.pos='{{selected.c | safe}}'  )
                }

                }
                )
                `
        }
        var objects = {
            rate: {
                el: new input(config, {
                    no: 'rate',
                    label: localization.en.rate,
                    required: true,
                    placeholder: "1",
                    allow_spaces:true,
                    type : "numeric",
                    extraction: "TextAsIs",
                    value: "1"
                })
            },

            plotdenfun: { el: new radioButton(config, { label: localization.en.pdenfun, no: "a", increment: "TRUE", style:"mt-3", value: "TRUE", state: "checked", extraction: "ValueAsIs" }) },
            plotdistfun: { el: new radioButton(config, { label: localization.en.pdstfun, no: "a", increment: "FALSE", value: "FALSE", state: "", extraction: "ValueAsIs" }) },

            lblRegUndr: { el: new labelVar(config, { label: localization.en.lblregions, style: "mt-3",h: 5 }) },
            xvalrad: { el: new radioButton(config, { label: localization.en.xvals, no: "b", increment: "TRUE", value: "TRUE", state: "checked", extraction: "ValueAsIs" }) },
            quntlrad: { el: new radioButton(config, { label: localization.en.quantiles, no: "b", increment: "FALSE", value: "FALSE", state: "", extraction: "ValueAsIs" }) },

            lblRegiFill: { el: new labelVar(config, { label: localization.en.lblRegFill, style: "mt-3",h: 5}) },

            lblRegion1: { el: new labelVar(config, { label: localization.en.lblreg1, style: "mt-3",h: 6 }) },
            reg1Frm: {
                el: new input(config, {
                    no: 'reg1frm',
                    label: localization.en.lblregfrm,
                    placeholder: "",
                    allow_spaces:true,
                    type : "numeric",
                    extraction: "TextAsIs",
                    value: ""
                })
            },
            reg1To: {
                el: new input(config, {
                    no: 'reg1to',
                    label: localization.en.lblregto,
                    placeholder: "",
                    allow_spaces:true,
                    type : "numeric",
                    extraction: "TextAsIs",
                    value: ""
                })
            },
            reg1Col: {
                el: new colorInput(config, {
                    no: 'reg1col',
                    label: localization.en.lblregcol,
                    placeholder: "#BEBEBE",
                    allow_spaces:true,
                    type: "character",
                    extraction: "TextAsIs",
                    value: "#BEBEBE"
                })
            },            

            lblRegion2: { el: new labelVar(config, { label: localization.en.lblreg2, style: "mt-3",h: 6 }) },
            reg2Frm: {
                el: new input(config, {
                    no: 'reg2frm',
                    label: localization.en.lblregfrm,
                    placeholder: "",
                    allow_spaces:true,
                    type : "numeric",
                    extraction: "TextAsIs",
                    value: ""
                })
            },    
            reg2To: {
                el: new input(config, {
                    no: 'reg2to',
                    label: localization.en.lblregto,
                    placeholder: "",
                    allow_spaces:true,
                    type : "numeric",
                    extraction: "TextAsIs",
                    value: ""
                })
            },     
            reg2Col: {
                el: new colorInput(config, {
                    no: 'reg2col',
                    label: localization.en.lblregcol,
                    placeholder: "#BEBEBE",
                    allow_spaces:true,
                    type: "character",
                    extraction: "TextAsIs",
                    value: "#BEBEBE"
                })
            },                           

            lblLegposi: { el: new labelVar(config, { label: localization.en.lblLegPos, style: "mt-3",h: 5 }) },
            toprtrad: { el: new radioButton(config, { label: localization.en.toprt, no: "c", increment: "TRUE", value: "topright", state: "checked", extraction: "ValueAsIs" }) },
            topltrad: { el: new radioButton(config, { label: localization.en.toplt, no: "c", increment: "FALSE", value: "topleft", state: "", extraction: "ValueAsIs" }) },
            topmidrad: { el: new radioButton(config, { label: localization.en.topmid, no: "c", increment: "FALSE", value: "top", state: "", extraction: "ValueAsIs" }) }
        }
        const content = {
            items: [objects.rate.el.content,
                objects.plotdenfun.el.content, objects.plotdistfun.el.content, objects.lblRegUndr.el.content,
                objects.xvalrad.el.content, objects.quntlrad.el.content, 
                objects.lblRegiFill.el.content, 
                objects.lblRegion1.el.content, objects.reg1Frm.el.content, objects.reg1To.el.content, objects.reg1Col.el.content, 
                objects.lblRegion2.el.content, objects.reg2Frm.el.content, objects.reg2To.el.content, objects.reg2Col.el.content,
                objects.lblLegposi.el.content, objects.toprtrad.el.content, objects.topltrad.el.content,objects.topmidrad.el.content
            ],
            nav: {
                name: localization.en.navigation,
                icon: "icon-letter-e-g",
                datasetRequired: false,
                modal: config.id
            }
        }
        super(config, objects, content);
        this.help = localization.en.help;
    }
}
module.exports.item = new exponentialDistributionPlot().render()