import { useState, type FormEvent } from 'react'
import { supabase } from './supabaseClient'
import './App.css'

const FEATURES = [
  {
    icon: '✨',
    title: 'AI 深度润色',
    desc: '基于岗位描述智能改写措辞，突出你的核心成果，告别流水账式经历罗列。',
  },
  {
    icon: '🎯',
    title: '岗位精准匹配',
    desc: '自动提取 JD 关键词，帮你调整简历重点，提高简历与岗位的匹配度。',
  },
  {
    icon: '⚡',
    title: '3 分钟出结果',
    desc: '上传原简历，等待几分钟即可拿到优化版本，无需反复往返沟通。',
  },
]

function App() {
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError(null)
    setSubmitting(true)

    const form = e.currentTarget
    const formData = new FormData(form)

    const { error: insertError } = await supabase.from('leads').insert({
      name: formData.get('name') as string,
      contact: formData.get('contact') as string,
      message: (formData.get('message') as string) || null,
    })

    setSubmitting(false)

    if (insertError) {
      setError('提交失败，请稍后再试。')
      console.error(insertError)
      return
    }

    setSubmitted(true)
  }

  return (
    <div className="page">
      <header className="nav">
        <div className="container nav__inner">
          <span className="nav__logo">简历焕新</span>
          <a href="#contact" className="nav__cta">
            免费试用
          </a>
        </div>
      </header>

      <main>
        <section className="hero">
          <div className="container hero__inner">
            <h1 className="hero__title">
              用 AI 让你的简历，<span className="hero__highlight">3 分钟脱颖而出</span>
            </h1>
            <p className="hero__subtitle">
              智能润色 + 岗位匹配，帮你写出更有说服力的简历，拿到更多面试邀约。
            </p>
            <a href="#contact" className="btn btn--primary hero__btn">
              免费优化我的简历
            </a>
          </div>
        </section>

        <section className="features" id="features">
          <div className="container">
            <h2 className="section__title">为什么选择我们</h2>
            <div className="features__grid">
              {FEATURES.map((f) => (
                <div className="feature-card" key={f.title}>
                  <div className="feature-card__icon">{f.icon}</div>
                  <h3 className="feature-card__title">{f.title}</h3>
                  <p className="feature-card__desc">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="contact" id="contact">
          <div className="container contact__inner">
            <h2 className="section__title">留下联系方式，获取免费优化</h2>
            <p className="contact__subtitle">
              填写下方信息，我们会尽快与你联系，帮你分析简历并给出优化建议。
            </p>

            {submitted ? (
              <div className="contact__success">
                提交成功！我们会尽快通过留下的联系方式与你联系 🎉
              </div>
            ) : (
              <form className="contact__form" onSubmit={handleSubmit}>
                <div className="form-row">
                  <label className="form-field">
                    <span>姓名</span>
                    <input type="text" name="name" placeholder="你的称呼" required />
                  </label>
                  <label className="form-field">
                    <span>联系方式</span>
                    <input
                      type="text"
                      name="contact"
                      placeholder="手机号 / 邮箱 / 微信"
                      required
                    />
                  </label>
                </div>
                <label className="form-field">
                  <span>想优化的方向（可选）</span>
                  <textarea
                    name="message"
                    placeholder="例如：想投产品经理岗位，希望突出项目经验"
                    rows={4}
                  />
                </label>
                {error && <p className="contact__error">{error}</p>}
                <button
                  type="submit"
                  className="btn btn--primary contact__submit"
                  disabled={submitting}
                >
                  {submitting ? '提交中…' : '提交，获取免费优化'}
                </button>
              </form>
            )}
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="container footer__inner">
          <span>© {new Date().getFullYear()} 简历焕新</span>
          <span className="footer__links">
            <a href="#features">产品特点</a>
            <a href="#contact">联系我们</a>
          </span>
        </div>
      </footer>
    </div>
  )
}

export default App
