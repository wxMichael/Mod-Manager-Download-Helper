/*

Mod Manager Download Helper
Copyright (C) 2025  wxMichael

This program is free software; you can redistribute it and/or
modify it under the terms of the GNU General Public License
as published by the Free Software Foundation; either version 2
of the License, or (at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program; if not, see <https://www.gnu.org/licenses/>.

*/

const filesTab = document.getElementById("mod-page-tab-files");
const targetNode = document.querySelector("div.tabcontent");

if (filesTab !== null && targetNode !== null) {
	const config = {
		attributes: true,
		childList: false,
		subtree: false,
		attributeOldValue: true,
		attributeFilter: ["class"]
	};

	if (document.getElementById("mod_files") !== null) checkDownloads();

	const observer = new MutationObserver(callback);
	observer.observe(targetNode, config);
}

function callback(mutationList, observer) {
	for (const mutation of mutationList) {
		if (mutation.type !== "attributes") continue;
		if (!mutation.target.nodeType === Node.ELEMENT_NODE) continue;

		let classList = mutation.target.classList;
		let loadingDone =
			mutation.oldValue.indexOf("tab-load") !== -1
			&& mutation.oldValue.indexOf("loading") === -1
			&& !classList.contains("tab-load")
			&& !classList.contains("loading");
		if (!loadingDone) continue;

		let mod_files = document.getElementById("mod_files");
		if (mod_files === null) continue;
		checkDownloads();
	}
};

function checkDownloads() {
	let mod_files = document.getElementById("mod_files").querySelectorAll("dd");
	mod_files.forEach((currentValue, currentIndex, listObj) => {
		let download_links = currentValue.querySelectorAll("li");
		if (download_links.length === 1) {
			addDownloadButton(download_links);
		}
	});
}

function addDownloadButton(download_links) {
	let manual_link = download_links[0];
	let new_link = manual_link.cloneNode(true);
	let separator = document.createElement("li");

	let manager_button = new_link.querySelector("a");
	manager_button.href = manager_button.href + "&nmm=1";
	manager_button.dataset.tracking = '["Mod Page", "Download File", "Mod Manager Download"]';
	manager_button.querySelector("span").innerText = "Mod manager download";

	manual_link.parentNode.insertBefore(separator, manual_link);
	manual_link.parentNode.insertBefore(new_link, separator);
}
