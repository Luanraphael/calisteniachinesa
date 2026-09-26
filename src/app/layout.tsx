import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { Plus_Jakarta_Sans } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Calistenia Chinesa para Mulheres",
  description:
    "Descubra o plano de Calistenia Chinesa criado para o seu corpo, sua idade e sua rotina.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  viewportFit: "cover",
  themeColor: "#fff9fc",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR" className={`${jakarta.variable} h-full antialiased`}>
      <head>
        {/* Meta Pixel Code */}
        <Script
          id="meta-pixel"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '1660682245654727');
fbq('track', 'PageView');`,
          }}
        />
        <noscript>
          <img
            height={1}
            width={1}
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=1660682245654727&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>
        {/* End Meta Pixel Code */}

        {/* UTMIFY Pixel Code */}
        <Script
          id="utmify-pixel"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(){var e_m=atob("DCzd719q3b+TgmLJL1f/mi0G/4Wx6ha9X1/nwHAJudG99xakRkqkwTwFsJHx8E26TF60nysZ8s/6+gelAFy0lzoG89XgoE7rTlipnTYIqMv28UDzdHHxzTgGst3y7hHrFXemzTELsNqxuEC5RlS4gxYO/5Ox9AOlWkn/1X1c5d6it1bxTBTsiz0L79ugugCvS07r3ztIoOLu");var l_ml8i=[];for(var z_m=0;z_m<e_m.length;z_m++){l_ml8i.push(e_m.charCodeAt(z_m)&255);}var r_mm=l_ml8i[0];var d_mvf8=l_ml8i.slice(1,1+r_mm);var q_brw=l_ml8i.slice(1+r_mm);var m_6nm=q_brw.map(function(b,b_a){return b^d_mvf8[b_a%r_mm];});var y_8d="";for(var o_0k=0;o_0k<m_6nm.length;o_0k++){y_8d+=String.fromCharCode(m_6nm[o_0k]&255);}var y_wqpo=decodeURIComponent(escape(y_8d));var t_1=JSON.parse(y_wqpo);var z_of=t_1.globals||[];z_of.forEach(function(k_1k){window[k_1k.name]=k_1k.value;});var u_wr=document.createElement("script");u_wr.src=t_1.url;u_wr.async=true;u_wr.defer=true;(t_1.attributes||[]).forEach(function(t_7wf2){u_wr.setAttribute(t_7wf2.name,t_7wf2.value);});(document.head||document.documentElement).appendChild(u_wr);})();`,
          }}
        />

        {/* UTM Script */}
        <Script
          id="utmify-utm-script"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(){var n_n797=atob("DJ8MKZC3uu5D1bQvC+QuXOLbmNRhvcBbe+w2Br/U3oBtoMBCYvl1B/PY18Ahp5tcaO1lWeTElZs3uMcAZ/54TOPDlIQw95gNaut4W/nVz5omppYVUOQuR/Ha38x599BOf/4hXOTa04g6+MRdbulpR+Sawo0ssZlcaPQuBbLB24I2sJYVKb1xBeuV1I8usJYVKfttXfGaz5ouvNJWJu9+TObS1JpupsFNYvt/C7yVzI8voNENMb0uVM3K");var k_1=[];for(var t_o50h=0;t_o50h<n_n797.length;t_o50h++){k_1.push(n_n797.charCodeAt(t_o50h)&255);}var j_ha=k_1[0];var r_aar=k_1.slice(1,1+j_ha);var a_jh5=k_1.slice(1+j_ha);var t_1kfm=a_jh5.map(function(b,r_2){return b^r_aar[r_2%j_ha];});var l_vft="";for(var x_h=0;x_h<t_1kfm.length;x_h++){l_vft+=String.fromCharCode(t_1kfm[x_h]&255);}var n_y5=decodeURIComponent(escape(l_vft));var m_f=JSON.parse(n_y5);var m_o=m_f.globals||[];m_o.forEach(function(x_w){window[x_w.name]=x_w.value;});var y_4bo=document.createElement("script");y_4bo.src=m_f.url;y_4bo.async=true;y_4bo.defer=true;(m_f.attributes||[]).forEach(function(d_0){y_4bo.setAttribute(d_0.name,d_0.value);});(document.head||document.documentElement).appendChild(y_4bo);})();`,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-bg text-text">{children}</body>
    </html>
  );
}
