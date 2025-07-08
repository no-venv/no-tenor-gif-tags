/*
 * Vencord, a Discord client mod
 * Copyright (c) 2025 Vendicated and contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

export function get_raw_gif(url: string) {
    const regex_match = url.match(/gif-(\d+)/);
    if (!regex_match) {
        // return error
        return;
    }
    console.log(url, regex_match);
    const gif_id = regex_match[1];
    const compiled_gif_link = `https://tenor.com/view/${gif_id}`;
    return compiled_gif_link;
    // return fetch(url).then(function (result) {
    //     return result.text();
    // })
    //     .then(function (tenor_html_page) {
    //         const regex_match = tenor_html_page.match(/((media1.tenor.com)\/m\/.*?)\//g);
    //         if (!regex_match) {
    //             // return error
    //             return;
    //         }
    //         const gif_id = regex_match[0].split("/")[2];
    //         const compiled_gif_link = `https://c.tenor.com/${gif_id}/tenor.gif`;
    //         return compiled_gif_link;
    //     });
}
