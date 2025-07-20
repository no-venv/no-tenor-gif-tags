/*
 * Vencord, a Discord client mod
 * Copyright (c) 2025 Vendicated and contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

export function get_raw_gif(url: string) {
    const regex_match = url.match(/gif-(\d+)/);
    const regex_match2 = url.match(/https:\/\/tenor\.com\/view\/\d+/);
    if (regex_match2) {
        return url;
    }
    if (!regex_match) {
        //  error
        return;
    }
    console.log(url, regex_match);
    const gif_id = regex_match[1];
    const compiled_gif_link = `https://tenor.com/view/${gif_id}`;
    return compiled_gif_link;
}
