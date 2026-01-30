
(function(){
  const title = document.title.replace(' | The Bookish Network','');
  const url = window.location.href;
  const btnShare = document.getElementById('btn-share');
  const btnEmail = document.getElementById('btn-email');
  const btnCopy  = document.getElementById('btn-copy');
  const dialogBackdrop = document.getElementById('share-dialog');
  const dialogUrlInput = document.getElementById('share-url');
  const dialogCopyBtn  = document.getElementById('btn-dialog-copy');
  const dialogCloseBtn = document.getElementById('btn-dialog-close');
  const dialogEmail    = document.getElementById('btn-dialog-email');
  const toast = document.getElementById('toast');
  function showToast(msg='Copied!'){ if (!toast) return; toast.textContent = msg; toast.classList.add('show'); setTimeout(()=>toast.classList.remove('show'), 1800); }
  async function copyToClipboard(text){ try { if (navigator.clipboard && window.isSecureContext) { await navigator.clipboard.writeText(text); } else { const ta=document.createElement('textarea'); ta.value=text; ta.setAttribute('readonly',''); ta.style.position='fixed'; ta.style.left='-9999px'; document.body.appendChild(ta); ta.select(); document.execCommand('copy'); document.body.removeChild(ta);} showToast('Link copied'); return true;} catch(e){ alert('Unable to copy automatically.'); return false; } }
  function openMailto(subject, body){ const mailto = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`; window.location.href = mailto; }
  function openShareDialog(){ if (!dialogBackdrop) return; if (dialogUrlInput) dialogUrlInput.value = url; if (dialogEmail){ dialogEmail.setAttribute('href', `mailto:?subject=${encodeURIComponent('Sharing: ' + title)}&body=${encodeURIComponent(title + '\n\n' + url)}`); } dialogBackdrop.style.display='flex'; dialogUrlInput && dialogUrlInput.focus(); document.addEventListener('keydown', trapEscape); }
  function closeShareDialog(){ if (!dialogBackdrop) return; dialogBackdrop.style.display='none'; document.removeEventListener('keydown', trapEscape); btnShare && btnShare.focus(); }
  function trapEscape(e){ if (e.key==='Escape') closeShareDialog(); }
  if (btnShare){ btnShare.addEventListener('click', async ()=>{ const shareData={title, text:title, url}; if (navigator.share){ try{ await navigator.share(shareData);}catch(err){ openShareDialog(); } } else { openShareDialog(); } }); }
  if (btnEmail){ btnEmail.addEventListener('click', ()=> openMailto(`Sharing: ${title}`, `${title}\n\n${url}`)); }
  if (btnCopy){ btnCopy.addEventListener('click', ()=> copyToClipboard(url)); }
  if (dialogCopyBtn){ dialogCopyBtn.addEventListener('click', ()=> copyToClipboard(dialogUrlInput.value)); }
  if (dialogCloseBtn){ dialogCloseBtn.addEventListener('click', closeShareDialog); }
  if (dialogBackdrop){ dialogBackdrop.addEventListener('click', (e)=>{ if (e.target===dialogBackdrop) closeShareDialog(); }); }
})();
