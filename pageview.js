var session;

function setAjaxVar() {
	if (window.XMLHttpRequest) {
		return new XMLHttpRequest();
    } else {
		return new ActiveXObject("Microsoft.XMLHTTP");
	}
}

async function pageload(site, page, details) {
	const { hn, sterms } = getRef();
	
	const params = new URLSearchParams({
		action: 'initiate',
		Site: site,
		Page: page,
		Host: hn,
		Terms: sterms,
		// The || '' ensures null or missing details send an empty string, not "undefined"
		Details: details || '', 
		Res: `${screen.width}-${screen.height}`
	});
	
	try {
		const response = await fetch('pageview.php', {
			method: 'POST',
			headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
			body: params
		});
		session = await response.text();
    } catch (e) {
		console.error('Failed to initiate session', e);
	}
}

function pageunload() {
	if (session) {
		const fd = new FormData();
		fd.append('action', 'exit');
		fd.append('Session', session);
		navigator.sendBeacon('pageview.php', fd);
	}
}

function getRef() {
	const url = document.referrer;
	
	if (!url) {
		return { hn: 'Direct', sterms: '' };
	}
	
	try {
		const refUrl = new URL(url);
		const hn = refUrl.hostname;
		
		const params = refUrl.searchParams;
		const rawTerms = params.get('q') || params.get('p') || params.get('query') || '';
		const sterms = rawTerms.replace(/\s{2,}/g, ' ').trim();
		
		return { hn, sterms };
		
    } catch (e) {
		return { hn: 'Unknown', sterms: '' };
	}
}