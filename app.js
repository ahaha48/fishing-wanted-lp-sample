// All external destinations are deliberately disconnected in this internal sample.
const siteSettings = { lineUrl: '', instagramUrl: '' };
const dialog = document.querySelector('#demo-dialog');
const title = document.querySelector('#dialog-title');
const message = document.querySelector('#dialog-message');
const menu = document.querySelector('.menu-toggle');
const nav = document.querySelector('#navigation');

const dialogContent = {
  line: ['LINE査定の導線です', 'このサイトは制作見本のため、LINEアカウントへの移動や査定の送信は行いません。本番では、公式LINEの友だち追加画面へつなぎます。'],
  instagram: ['Instagramへの導線です', '写真の配置とフォロー導線をご確認いただくための見本です。実際のアカウントへの移動やDM送信は行いません。'],
  policy: ['プライバシーポリシー', '掲載原稿は本番用の確定内容に差し替えます。この見本では個人情報の入力・送信を受け付けていません。'],
  legal: ['事業者情報・各種表記', '代表者名・所在地・連絡先・古物商許可番号・法令に関する確定原稿は、本番制作時に依頼者様の情報に差し替えます。架空の事業者情報は掲載していません。']
};

function closeMenu() {
  nav.classList.remove('open');
  menu.setAttribute('aria-expanded', 'false');
}

menu.addEventListener('click', () => {
  const open = menu.getAttribute('aria-expanded') !== 'true';
  menu.setAttribute('aria-expanded', String(open));
  nav.classList.toggle('open', open);
});
nav.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', event => {
  if (event.key === 'Escape') closeMenu();
});

document.querySelectorAll('[data-action]').forEach(button => {
  button.addEventListener('click', () => {
    const action = button.dataset.action;
    const location = button.dataset.location || action;
    // Hook for agreed production analytics; no analytics service is loaded here.
    window.dispatchEvent(new CustomEvent('lp:cta-click', { detail: { action, location, sample: true } }));
    const destination = action === 'line' ? siteSettings.lineUrl : action === 'instagram' ? siteSettings.instagramUrl : '';
    if (destination) {
      window.open(destination, '_blank', 'noopener,noreferrer');
      return;
    }
    const copy = dialogContent[action];
    if (!copy) return;
    title.textContent = copy[0];
    message.textContent = copy[1];
    closeMenu();
    dialog.showModal();
    document.body.classList.add('dialog-open');
  });
});

dialog.querySelectorAll('.dialog-close, .dialog-done').forEach(button => button.addEventListener('click', () => dialog.close()));
dialog.addEventListener('close', () => document.body.classList.remove('dialog-open'));
dialog.addEventListener('click', event => {
  const rect = dialog.getBoundingClientRect();
  if (event.target === dialog && (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom)) dialog.close();
});
