<div align="center">

# 🏛️ سجاد يدوي — Handmade Carpets Store

**متجر إلكتروني احترافي لبيع السجاد اليدوي الفاخر**

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)

</div>

---

## 📌 نبذة عن المشروع

موقع تجارة إلكترونية متكامل لعرض وبيع السجاد اليدوي الفاخر، مبني بتقنيات الويب الحديثة مع واجهة مستخدم عربية بالكامل وتصميم RTL احترافي.

---

## ✨ المميزات

### 🛍️ واجهة العميل
- **الصفحة الرئيسية** — عرض المنتجات المميزة وأحدث الإضافات
- **صفحة المنتجات** — عرض كامل مع فلترة حسب الفئة (كلاسيكي، بدوي، شرقي...)
- **سلة التسوق** — إضافة/حذف منتجات، تعديل الكميات، تطبيق كود خصم
- **إتمام الطلب** — نموذج بيانات العميل مع توليد رقم تتبع تلقائي
- **تتبع الطلب** — متابعة حالة الطلب خطوة بخطوة عبر رقم التتبع
- **واتساب فلوت** — زر تواصل مباشر عبر واتساب

### 🔧 لوحة التحكم (Admin Panel)
- **إدارة المنتجات** — إضافة / تعديل / حذف + رفع الصور على Supabase Storage
- **إدارة الطلبات** — تحديث حالة الطلب + إشعار العميل عبر واتساب تلقائياً
- **إدارة الكوبونات** — إنشاء وإدارة أكواد الخصم
- **إحصائيات** — نظرة عامة على المنتجات والطلبات
- **تصدير Excel** — تصدير الطلبات والمنتجات CSV

---

## 🗂️ هيكل المشروع

```
handmade-carpets/
│
├── index.html              # الصفحة الرئيسية
├── products.html           # صفحة المنتجات
├── track.html              # تتبع الطلبات
│
├── css/
│   └── styles.css          # ملف التصميم الكامل
│
├── js/
│   ├── supabase.js         # إعداد Supabase + Helper Functions
│   └── cart.js             # منطق سلة التسوق
│
└── admin/
    ├── index.html          # لوحة التحكم - الرئيسية
    ├── login.html          # صفحة تسجيل الدخول
    ├── products.html       # إدارة المنتجات
    ├── orders.html         # إدارة الطلبات
    └── promo.html          # إدارة الكوبونات
```

---

## 🛠️ التقنيات المستخدمة

| التقنية | الاستخدام |
|---------|-----------|
| **HTML5** | هيكل الصفحات |
| **CSS3** | تصميم كامل مع متغيرات CSS و Animations |
| **Vanilla JavaScript** | منطق التطبيق بدون frameworks |
| **Supabase** | قاعدة البيانات PostgreSQL + Storage للصور |
| **Google Fonts** | خطوط Cairo و Tajawal للعربية |

---

## 🗄️ قاعدة البيانات (Supabase)

### جداول المشروع

**`products`**
```sql
id, name, description, price, category, dimensions, material, image_url, is_available, created_at
```

**`orders`**
```sql
id, tracking_number, customer_name, customer_phone, customer_address, items (JSONB), total_price, status, notes, created_at
```

**`promo_codes`**
```sql
id, code, discount_percentage, is_active, created_at
```

### حالات الطلب
| الحالة | المعنى |
|--------|--------|
| `pending` | قيد المراجعة |
| `processing` | قيد التجهيز |
| `shipped` | تم الشحن |
| `delivered` | تم التوصيل |
| `cancelled` | ملغي |

---

## 🚀 طريقة التشغيل

### 1. إعداد Supabase
1. أنشئ مشروعاً جديداً على [supabase.com](https://supabase.com)
2. أنشئ الجداول الثلاثة بالـ schema الموضح أعلاه
3. أنشئ Storage Bucket باسم `carpets` (public)

### 2. إعداد المشروع
```bash
git clone https://github.com/ahmedsaalmann/handmade-carpets.git
cd handmade-carpets
```

### 3. تحديث بيانات Supabase
في ملف `js/supabase.js`:
```javascript
const SUPABASE_URL = 'YOUR_SUPABASE_URL';
const SUPABASE_ANON_KEY = 'YOUR_SUPABASE_ANON_KEY';
```

### 4. رفع على أي استضافة ثابتة
المشروع يعمل مباشرة بدون build steps — ارفع الملفات على:
- **GitHub Pages**
- **Netlify**
- **Vercel**
- أي استضافة عادية

---

## 🔐 لوحة التحكم

```
الرابط: /admin/login.html
كلمة المرور: 123321123
```

> ⚠️ يُنصح بتغيير كلمة المرور قبل النشر للإنتاج

---

## 📱 التوافق

- ✅ متوافق مع جميع المتصفحات الحديثة
- ✅ متجاوب مع الموبايل (Responsive)
- ✅ دعم كامل للغة العربية وـ RTL
- ✅ تحسينات SEO أساسية

---

## 📄 الرخصة

هذا المشروع مفتوح المصدر تحت رخصة [MIT](LICENSE).

---

<div align="center">
  صُنع بـ ❤️ في مصر 🇪🇬
</div>
