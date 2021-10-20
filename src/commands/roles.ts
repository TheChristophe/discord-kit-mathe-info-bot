import { MessageSelectOptionData } from 'discord.js';

const DEFUNCT = 'aufgelöst';

export const oPhasenRoles: MessageSelectOptionData[] = [
    {
        label: '202 Accepted',
        emoji: '\ud83d\udc31',
        value: '608684966464978945',
        description: DEFUNCT,
    },
    {
        label: 'Arrrrr!',
        emoji: '\ud83c\uddf7',
        value: '501765655981457428',
    },
    {
        label: 'First Contact',
        emoji: '\ud83d\udc7d',
        value: '501371116745392159',
        description: DEFUNCT,
    },
    {
        label: 'FIT-Info',
        emoji: '\ud83d\udeb5',
        value: '501765776546725891',
        description: DEFUNCT,
    },
    {
        label: 'HiGHtech',
        emoji: '\ud83c\udf43',
        value: '633304844622626886',
    },
    {
        label: 'Legendary',
        emoji: '\ud83c\udf7b',
        value: '608686822801014795',
    },
    {
        label: 'Lila Pause',
        emoji: '\ud83d\udc2e',
        value: '501739711740510221',
    },
    {
        label: 'Malibu',
        emoji: '\ud83c\udf78',
        value: '633304796450914314',
    },
    {
        label: 'Parti πple',
        emoji: '\ud83c\udf8a',
        value: '633304892987015178',
    },
    {
        label: 'Pirates',
        emoji: '\u26f5',
        value: '502532281055969282',
    },
    {
        label: 'Project π',
        emoji: '\ud83c\udf70',
        value: '502031712025575424',
    },
    {
        label: 'Second Contact',
        emoji: '\u0032\ufe0f\u20e3',
        value: '633305234701287442',
        description: DEFUNCT,
    },
    {
        label: 'Studier Langsam',
        emoji: '\ud83d\udc22',
        value: '501371170579283978',
    },
    {
        label: 'Team Gecko',
        emoji: '\ud83e\udd8e',
        value: '762765617752178708',
    },
    {
        label: '#kitinfo',
        emoji: '\u0023\ufe0f\u20e3',
        value: '501765467959066644',
        description: DEFUNCT,
    },
];

export const jahrgangRoles: MessageSelectOptionData[] = [
    {
        label: 'WS 2021/2022',
        emoji: '\ud83d\udc1d',
        value: '843482558544347136',
    },
    {
        label: 'WS 2020/2021',
        emoji: '\ud83e\udd89',
        value: '756553386786291944',
    },
    {
        label: 'WS 2019/2020',
        emoji: '\ud83d\udc27',
        value: '756553443862380675',
    },
    {
        label: 'WS 2018/2019',
        emoji: '\ud83d\udc26',
        value: '756553491237044224',
    },
    {
        label: 'WS 2017/2018',
        emoji: '\ud83e\udd8b',
        value: '756553525198192840',
    },
    {
        label: 'WS 2016/2017',
        emoji: '\ud83e\udd84',
        value: '756553572178460782',
    },
    {
        label: 'Langzeitstudent',
        emoji: '\ud83e\udd87',
        value: '756553637903204492',
    },
];

export const studiengangRoles: MessageSelectOptionData[] = [
    {
        label: 'Informatik',
        emoji: '\ud83d\udda5\ufe0f',
        value: '501408401083990022',
    },
    {
        label: 'Mathe',
        emoji: '\ud83c\udfb2',
        value: '501408370352455690',
    },
    {
        label: 'Wirtschaftsinformatik',
        emoji: '\ud83d\udcb8',
        value: '816419211198070855',
    },
    {
        label: 'Sonstiges',
        emoji: '\ud83d\udc64',
        value: '503261727526354973',
    },
];

export const sonstigeRoles: MessageSelectOptionData[] = [
    {
        label: 'Bachelor',
        value: '894288353418178570',
        emoji: '🐛',
    },
    {
        label: 'Master',
        value: '894288392181928017',
        emoji: '🦋',
    },
    {
        label: 'Lehramt',
        value: '897301968429678622',
        emoji: '🧑‍🏫',
    },
    {
        label: 'Ehemaliger Student',
        value: '892763573477048320',
        emoji: '🧙',
    },
    {
        label: 'Age of Empires 2',
        value: '900485186872020992',
        emoji: '⚔️',
    },
    {
        label: 'Lernzentrum',
        value: '821725348789092362',
        emoji: '🪶',
        description: 'Versteckt alle nicht-studienrelevante Kanäle',
    },
];
