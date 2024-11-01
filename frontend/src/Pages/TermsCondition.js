import React, { useState } from "react";
import "../Style/TermsCon.css";
import { Link } from "react-router-dom";

function TermsCon() {
  return (
    <div className="terms-contents">
      <h2>Məxfilik siyasəti</h2>
      <p>
        İstifadəçi razılaşmasına əlavə №1 1. Məxfilik siyasəti <br/> 1.1. Hazırkı
        məxfilik Siyasəti ecorest.az Servisin İstifadəçi Razılaşmasının ayrılmaz
        hissəsidir.<br/> 1.2. Hazırkı məxfilik Siyasəti İstifadəçinin şəxsi
        məlumatlarının alınması, saxlanması, işlənməsi, istifadəsi, açılması və
        müdafiəsi qaydasını müəyyən edir. <br/>1.3. İstifadəçilərin şəxsi məlumat
        bazası Administrasiyanın ünvanı üzrə yerləşir.<br/> 1.4. Elanın dərc edilməsi
        üçün formanı dolduran zaman və ya İstifadəçinin qeydiyyatı zamanı, və ya
        göndərmələrə abunə yazılma zamanı, həmçinin də xidmətdən istifadənin
        başqa hallarında, İstifadəçi Administrasiyaya məlumatları və şəxsi
        məlumatları verir. <br/>1.5. İstifadəçi xidmətə özü haqqında şəxsi
        məlumatların və istənilən başqa informasiyanın verilməsi haqqında
        sərbəst və könüllü qərar qəbul edir, həmçinin də bununla belə şəxsi
        məlumatların və informasiyanın Administrasiya tərəfindən işlənməsinə,
        işlənməsi üçün onların Administrasiyanın tapşırığı ilə hərəkət edən
        başqa İstifadəçilərə və/və ya üçüncü şəxslərə ötürülməsinə öz razılığını
        bildirir. <br/>1.6. Şəxsi məlumatların işlənməsi istənilən hərəkət və ya
        hərəkətlərin toplanma, qeydiyyat, yığım, saxlama, uyğunlaşma,
        dəyişiklik, yeniləmə, istifadə və yayılma kimi məcmusudur (yayılma,
        reallaşdırma, ötürülmə, həmçinin xaricə). <br/>1.7. Şəxsi məlumatların
        işlənməsinin məqsədləri, o cümlədən, aşağıdakılardır: <br/>1.7.1. Ecorestin,
        onun istifadəçilərinin və xidmətlərinin fəaliyyətinin yaxşılaşması üçün
        statistik və analitik məlumatların alınması; <br/>1.7.2. göstərilən
        xidmətlərin spektrinin genişləndirilməsi; <br/><br/>1.7.3. Servisin və ya üçüncü
        şəxslərin informasiya və ya reklam xəbərlərinin alınması (yeni imkanlar,
        aksiyalar və başqa xəbərlər haqqında xəbərdarlıq); <br/>1.7.4.
        İstifadəçilərin və ya üçüncü şəxslərin qanunsuz və ya icazəsiz
        hərəkətlərinin xəbərdarlığı və qabağının alınması; <br/>1.7.5. qüvvədə olan
        qanunvericiliyin tələblərinə riayətin təminatı. <br/>1.8. Ecorest
        İstifadəçilər haqqında növbəti informasiyanı toplayır: <br/>1.8.1. Ecorestdən
        istifadə zamanı Administrasiyaya İstifadəçinin daxil etdiyi şəxsi
        informasiyanı göstərir və ya başqa üsulla açır. Belə informasiya, xüsusi
        halda (lakin, məhdudlaşdırılmadan), İstifadəçinin adı və soyadı,
        elektron poçt ünvanı və parolu, telefon nömrəsi, İstifadəçinin
        yerləşdiyi yer, həmçinin ünvanı ola bilər. İstifadəçi ona verilmiş
        informasiyaya görə məsuliyyət daşıyır. <br/>1.8.2. Ecorestin, ona giriş
        zamanı, proqram təminatı tərəfindən avtomatik toplanan texniki
        informasiya. <br/>1.9. Ecorest, həmçinin də Administrasiya, irqi və ya etnik
        mənşə haqqında məlumatları, siyasi, dini və dünyagörüşü, siyasi
        partiyalara və həmkarlar ittifaqlarına üzvlük, cinayət cəzasına
        məhkumluqlar, həmçinin də sağlamlığa, cinsi həyatına aid olan
        məlumatları, biometrik və ya genetik məlumatları toplamır və işləmir.
        <br/>1.10. Ecorest və Administrasiya Ecorestə aidiyyati olmayan üçüncü
        şəxslərə İstifadəçilər tərəfindən təqdim edilmiş heç bir şəxsi və ya
        başqa məlumatları, İstifadəçi icazə verdiyi hal istisna olmaqla,
        həmçinin də İstifadəçi razılaşması ilə və ya qanunvericiliklə nəzərdə
        tutulmuş hallarda vermir. <br/>1.11. Ecorest və Administrasiya bəzi hallarda
        bəzi məlumatları Ecorestlə əməkdaşlıq edən və ya Administrasiya ilə
        bağlı olan şəxslərə verə bilər. <br/>1.12. Administrasiya xidmətdən istifadə
        prosesində İstifadəçilər tərəfindən verilmiş informasiyanı və şəxsi
        məlumatları satmır və icarəyə vermir. <br/>1.13. İstifadəçilər arasında
        qarşılıqlı təsiri yüngülləşdirmək üçün, xidmətlər başqa İstifadəçilərin
        əlaqə informasiyasına məhdudlaşdırılmış girişi nəzərdə tutur. Başqa
        İstifadəçilər tərəfindən verilmiş məlumatlardan istifadə hüququ
        İstifadəçi razılaşması ilə məhdudlaşdırılır. <br/>1.14. Ecorestin
        İstifadəçisi başqa İstifadəçi tərəfindən verilmiş məlumatlardan,
        İstifadəçinin yazılı icazəsi olmadan və ya belə məlumatlardan hər hansı
        başqa yolla istifadə etmək hüququnun təsdiqi olmadan istifadə etməməyi
        öhdəsinə götürür. <br/>1.15. Ecorestin İstifadəçisi onun xidmətdən istifadə
        prosesində verdiyi şəxsi və başqa məlumatları istənilən vaxt qismən
        dəyişdirmək, silmək və ya başqa üsulla düzəliş etmək imkanına malikdir.
        <br/>1.16. İstifadəçi onun göstərdiyi istənilən informasiyanın və
        məlumatların dəqiqliyi və düzgünlüyü üçün məsuliyyət daşıyır. <br/>1.17. Əgər
        İstifadəçi girişi, qeydiyyatı həyata keçirmişsə və OpenID xidmətinin
        köməyi ilə Xidmətdən istifadə edirsə, İstifadəçi onun məlumatlarının
        ötürülməsi və onlardan istifadə qaydasını belə xidmətin parametrlərində
        qura bilər. <br/>1.18. Xidmət və Administrasiya İstifadəçinin şəxsi
        məlumatlarının üçüncü şəxslərin icazəsiz girişindən müdafiəsi üçün bütün
        səmərəli ölçüləri qəbul edir. <br/>1.19. Ecorest tərəfindən toplanmış və
        işlənmiş bütün şəxsi məlumatlar bir və ya bir neçə qorunan korporativ
        şəbəkədən kənarda giriş olmayan serverdə saxlanılır. Administrasiyanın
        İstifadəçilərin şəxsi və başqa informasiyasından girişlə və istifadə ilə
        funksiyaları yerinə yetirən bütün əməkdaşları üçüncü şəxslərə
        İstifadəçilər haqqında informasiyanın yayılmaması haqqında razılaşma
        imzalamışlar. <br/>1.20. Ecorestin İstifadəçisi şəxsi məlumatlarının
        Ecorestdən silinməsinə sorğu göndərə bilər. Belə bir sorğu olduqda, onun
        haqqında toplanan bütün şəxsi məlumatlar silinəcək və gələcəkdə Ecorestə
        girişin təmin edilməsinə zəmanət verilməyəcək. İstifadəçi haqqında şəxsi
        məlumatları silmək üçün info@progro.az ilə əlaqə saxlamalısınız. 2.
        Cookies, veb-mayaklar, və oxşar texnologiyalar <br/><br/>2.1. Ecorest
        informasiyanın saxlanılması üçün cookies fayllarından, veb-mayaklardan
        və başqa oxşar texnologiyalardan istifadə edə bilər. Bu fayllar
        veb-saytın və onun əlavələrinin istifadəsini yüngülləşdirmək məqsədi ilə
        əlavə olunub, Ecorest xidmətlərinin keyfiyyətinin artırılması məqsədi
        ilə (həmçinin təhlükəsizlik), həmçinin reklam məqsədi ilə istifadə
        olunur. <br/>2.2. Ecorest tərəfindən İstifadəçidən alınan istənilən
        informasiya, həmçinin cookies fayllarının İstifadəçinin brauzerində
        yerləşdirilməsi, xəbərdarlıq vasitəsilə və İstifadəçinin icazəsi ilə
        həyata keçirilir. Xidmətdən istifadəni davam edərək, İstifadəçi Ecorestə
        cookies fayllarının İstifadəçinin brauzerində saxlamasına öz icazəsini
        verir. <br/>2.3. Ecorest cookies-dən və oxşar texnologiyalardan,
        İstifadəçinin brauzerinin fəallığı prosesində İstifadəçinin qurğusunda
        qalan və cookies, həmçinin də daha uzunmüddətli dövr ərzində
        İstifadəçinin qurğusunda qalan başqa oxşar texnologiyalardan istifadə
        edir. İstifadəçi belə cookies və oxşar texnologiyaları bloklamaqda,
        silməkdə və ya kəsməkdə, əgər İstifadəçinin qurğusu buna icazə verirsə,
        haqlıdır. <br/>2.3.1. Cookies – kompüter terminologiyasında Ecorestdən
        alınmış mətn və ya ikili məlumatlar şəklində informasiyanın təsviri üçün
        istifadə edilən anlayışdır ki, İstifadəçidə saxlanılır, yəni brauzerdə,
        sonra isə əgər Servisin İstifadəçisi ona təkrar olaraq baş çəkirsə,
        Ecorestə yollanır. <br/>2.3.2. Veb-mayaklar – Ecorestdə, həmçinin onun
        xidmətlərində, əlavələrdə, mübadilə xəbərlərində, və İstifadəçini
        müəyyən etmək üçün adətən cookies ilə uyğunluqda işləyən alətlərdə
        qoşula bilən kiçik qrafik təsvirlərdir (həmçinin "nöqtə markörləri" və
        ya "Şəbəkə mayakları" kimi məlumdur). <br/>2.3.3. Oxşar texnologiyalar –
        lokal ümumi obyektləri və ya lokal anbarı və proqram veb-əlavələrinin
        başqa metodları istifadə edən, brauzerdə və ya qurğuda informasiyanı
        saxlayan, "flashcookies" "HTML 5 cookies" kimi texnologiyalardır. Bu
        texnologiyalar İstifadəçinin bütün brauzerlərində işləyə bilər, bəzi
        hallarda isə tamamilə brauzerlə idarə oluna bilmirlər və İstifadəçi
        tərəfindən təyin edilmiş əlavələr və ya qurğular vasitəsilə birbaşa
        idarəetməni tələb edə bilərlər. <br/>2.4. Cookies-ə və oxşar texnologiyalara
        icazə olunmamış girişin qarşısını almaq üçün Administrasiya bütün
        təhlükəsizlik tədbirlərini görür. İstifadəçi analoji təhlükəsizlik
        tədbirlərini görməyi öhdəsinə götürür. Administrasiya zəmanət verir ki,
        yalnız Administrasiya və/və ya Ecorest xidmətlərinin səlahiyyətli
        təchizatçıları cookies məlumatlarına girişə malikdirlər. <br/>2.5. Ecorestin
        xidmətlərinin təchizatçıları Ecorestin müxtəlif aspektləri ilə kömək
        edən şirkətlərdir. Administrasiya Ecorestin uyğun olan xidmətlərinin
        İstifadəçiyə verilməsi, həmçinin də Ecorestin bilavasitə fəaliyyəti ilə
        bağlı başqa məqsədlər üçün xidmətlərin bəzi səlahiyyətli
        təchizatçılarından istifadə edir. Xidmətlərin belə təchizatçıları
        həmçinin Ecorestin (kənar cookies) xidmətləri vasitəsilə cookies-i
        İstifadəçinin qurğusunda yerləşdirə bilərlər. Onlar həmçinin başqa
        informasiyanı, məsələn, IP-ünvan və ya başqa eyniləşdiriciləri, toplaya
        bilərlər. <br/>2.6. Ecorestin yuxarıda göstərilmiş texnologiyalardan istifadə
        vasitəsilə toplayıb saxladığı istənilən informasiyadan İstifadəçinin
        icazəsi ilə istifadə olunur. <br/>2.7. İstifadəçi brauzerin və ya qurğunun
        parametrlərində cookies-i idarə edə bilər. İnformasiyanın toplanmasından
        və saxlanılmasından imtina üçün brauzerin parametrlərində "Cookies-i
        saxlamamaq" bəndində bayraqcığı qurmaq, həmçinin "Cookies-i təmizləmək"
        düyməsini basmaq lazımdır. <br/>2.8. Sistemdə olan texniki xarakterli
        informasiya, məsələn, ip-ünvanlar, Ecorest tərəfindən şəbəkə
        avadanlığının xidməti üçün, həmçinin statistik və başqa informasiyanın
        ümumiləşdirilməsi üçün istifadə olunur. <br/>2.9. İstifadəçinin fərdi
        ehtiyaclarına və maraqlarına uyğunlaşdırılan xidmətlətin yüksək
        keyfiyyətli təminatı məqsədi ilə Ecorest İstifadəçinin sistemə son
        girişinin məlumatlarını saxlayır. <br/>3. Məxfilik siyasətinə dəyişikliklərin
        daxil edilməsi <br/>3.1. Administrasiya Məxfilik Siyasətinə dəyişikliklər
        edə, silə və ya qaydalarını yeniləyə bilər. <br/>3.2. Əgər İstifadəçi daxil
        edilmiş dəyişikliklərlə razı deyilsə, o Ecorestdən istifadəni
        dayandırmalıdır. Əgər İstifadəçi Ecorestdən istifadə etməyə davam
        edirsə, o razılaşır və bütün dəyişiklikləri və Məxfilik siyasətinin yeni
        redaksiyasını bütövlükdə qəbul edir.
      </p>
    </div>
  );
}

export default TermsCon;
