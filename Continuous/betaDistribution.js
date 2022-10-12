
var localization = {
    en: {
        title: "Beta Distribution Plot",
        navigation: "Beta Distribution Plot",
        shape1: "Shape 1",
        shape2: "Shape 2",
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
            title: "Beta Distribution Plot",
            r_help: "help(qbeta, package=stats)",
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

class betaDistributionPlot extends baseModal {
    constructor() {
        var config = {
            id: "betaDistributionPlot",
            label: localization.en.title,
            modalType: "one",
            RCode: `
            local(
                {
                #Generating the sequence of length 1000,the lower and upper bounds of the sequence are computed using the quantile function of the beta distribution  (qbeta)  with p=0.0005 and p=0.9995 respectively 
                lowProbBound =0.0005
                upperProbBound=0.9995
                lowerbound =stats::qbeta(p=lowProbBound,shape1={{selected.shape1 | safe}},shape2={{selected.shape2 | safe}})
                upperbound =stats::qbeta(p=upperProbBound,shape1={{selected.shape1 | safe}},shape2={{selected.shape2 | safe}})
                #cat(paste("Plotting a beta distribution using a sequence of length 1000,with lower bound ",lowerbound," an upper bound ",upperbound,". 
                #The lower and upper bounds of the sequence are computed using the quantile function of the beta distribution (qbeta) with probability p=0.0005 and p=0.9995 respectively" ))
                  .x <- seq(lowerbound,upperbound,length.out=1000)  
                
                #Optionally capturing regions to fill
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
                  RcmdrMisc::plotDistr(.x,stats::dbeta(.x,shape1={{selected.shape1 | safe}},shape2={{selected.shape2 | safe}}),cdf=FALSE,xlab="x",
                  ylab="Density",
                  main=paste("Beta Distribution:  Shape 1={{selected.shape1 | safe}},Shape 2={{selected.shape2 | safe}}"),
                  regions=regionslist,col=c('{{selected.reg1col | safe}}','{{selected.reg2col | safe}}'),
                  legend.pos='{{selected.c | safe}}'  )
                }
                else
                {
                  RcmdrMisc::plotDistr(.x,stats::pbeta(.x,shape1={{selected.shape1 | safe}},shape2={{selected.shape2 | safe}}),cdf=TRUE,xlab="x",
                  ylab="Cumulative Probability",
                  main=paste("Beta Distribution:  Shape 1={{selected.shape1 | safe}},Shape 2={{selected.shape2 | safe}}"),
                  regions=regionslist,col=c('{{selected.reg1col | safe}}','{{selected.reg2col | safe}}'),
                  legend.pos='{{selected.c | safe}}'  )
                }



                }
                )
                `
        }
        var objects = {
            shape1: {
                el: new input(config, {
                    no: 'shape1',
                    label: localization.en.shape1,
                    required: true,
                    placeholder: "0",
                    allow_spaces:true,
                    type : "numeric",
                    extraction: "TextAsIs",
                    value: ""
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
                    value: ""
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
            items: [objects.shape1.el.content, objects.shape2.el.content, 
                objects.plotdenfun.el.content, objects.plotdistfun.el.content, objects.lblRegUndr.el.content,
                objects.xvalrad.el.content, objects.quntlrad.el.content, 
                objects.lblRegiFill.el.content, 
                objects.lblRegion1.el.content, objects.reg1Frm.el.content, objects.reg1To.el.content, objects.reg1Col.el.content, 
                objects.lblRegion2.el.content, objects.reg2Frm.el.content, objects.reg2To.el.content, objects.reg2Col.el.content,
                objects.lblLegposi.el.content, objects.toprtrad.el.content, objects.topltrad.el.content,objects.topmidrad.el.content
            ],
            nav: {
                name: localization.en.navigation,
                icon: "icon-beta_g",
                datasetRequired: false,
                modal: config.id
            }
        }
        super(config, objects, content);
        this.help = localization.en.help;
    }
}
module.exports.item = new betaDistributionPlot().render()