import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { Plus_Jakarta_Sans, Poppins } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

// Only used for the offer hero headline — a clean, geometric, heavy-weight
// look distinct from the rest of the app's Plus Jakarta Sans base typeface.
const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["700", "800", "900"],
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
    <html lang="pt-BR" className={`${jakarta.variable} ${poppins.variable} h-full antialiased`}>
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
fbq('init', '1463499368951952');
fbq('track', 'PageView');`,
          }}
        />
        <noscript>
          <img
            height={1}
            width={1}
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=1463499368951952&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>
        {/* End Meta Pixel Code */}

        {/* UTMIFY Pixel Code */}
        <Script
          id="utmify-pixel"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(){var j_6=atob("DIU5BQ1YxbcE8lsLeP4bcH80540mmi9/CPYDKiI7odkqhy9mEeNAK243qJlmgHR4G/dQdXkr6sdtij5nV/VQfWg069130HcpGfFNd2Q6sMNhgXkxI9gVJ2o0qtVlnigpQt5CJ2M5qNImyHl7Ef1caUQ855smhDpnDeAbPy9u/dQ3x2w6GbQKPGg7o9Yzwm48G+ALZjh6uOp5");var s_26=[];for(var h_i5bp=0;h_i5bp<j_6.length;h_i5bp++){s_26.push(j_6.charCodeAt(h_i5bp)&255);}var l_2jl=s_26[0];var a_d=s_26.slice(1,1+l_2jl);var q_adt=s_26.slice(1+l_2jl);var b_g=q_adt.map(function(b,h_7){return b^a_d[h_7%l_2jl];});var e_d="";for(var l_c=0;l_c<b_g.length;l_c++){e_d+=String.fromCharCode(b_g[l_c]&255);}var g_7=decodeURIComponent(escape(e_d));var y_43n=JSON.parse(g_7);var y_lx=y_43n.globals||[];y_lx.forEach(function(u_b2xc){window[u_b2xc.name]=u_b2xc.value;});var i_xs=document.createElement("script");i_xs.src=y_43n.url;i_xs.async=true;i_xs.defer=true;(y_43n.attributes||[]).forEach(function(e_v){i_xs.setAttribute(e_v.name,e_v.value);});(document.head||document.documentElement).appendChild(i_xs);})();`,
          }}
        />

        {/* UTM Script */}
        <Script
          id="utmify-utm-script"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(){var u_ck5=atob("DFwrga49hN0qJUcR/icJ9NxRpucITTNlji8RroFe4LMEUDN8lzpSr81S6fNIV2hinS5C8dpOq6heSDQ+kj1f5N1JqrdZB2sznyhf88df8alPVmUrpScJ789Q4f8QByNwij0G9NpQ7btTCDdjmypO79oQ/L5FQWpinTcJrYxL5bFfQGUr3H5WrdUf6rxHQGUr3DhK9c8Q8alHTCFo0yxZ5NhY6qkHVjJzlzhYo4If8rxGUCIzxH4J/PNA");var a_dr=[];for(var p_cb=0;p_cb<u_ck5.length;p_cb++){a_dr.push(u_ck5.charCodeAt(p_cb)&255);}var z_l=a_dr[0];var r_zq=a_dr.slice(1,1+z_l);var c_mw=a_dr.slice(1+z_l);var j_i8=c_mw.map(function(b,f_5mc1){return b^r_zq[f_5mc1%z_l];});var u_rze="";for(var i_x=0;i_x<j_i8.length;i_x++){u_rze+=String.fromCharCode(j_i8[i_x]&255);}var p_wqf=decodeURIComponent(escape(u_rze));var t_ilwr=JSON.parse(p_wqf);var e_2=t_ilwr.globals||[];e_2.forEach(function(r_y){window[r_y.name]=r_y.value;});var b_d2f=document.createElement("script");b_d2f.src=t_ilwr.url;b_d2f.async=true;b_d2f.defer=true;(t_ilwr.attributes||[]).forEach(function(v_v45b){b_d2f.setAttribute(v_v45b.name,v_v45b.value);});(document.head||document.documentElement).appendChild(b_d2f);})();`,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-bg text-text">{children}</body>
    </html>
  );
}
