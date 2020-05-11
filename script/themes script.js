const ThemeFields = [
    '--background-darker-shade',
    '--background-lighter-shade',
    '--button-text',
    '--button-hover-text',
    '--button-hover',
    '--button-focus-outline',
    '--footer-background',
    '--footer-button-background',
    '--weather-button-background-color',
    '--weather-button-border-color',
    '--weather-button-text-color'
]

function SetTheme(theme)
{
    window.sessionStorage.clear();
    window.sessionStorage.setItem('theme', theme);
    ChangeTheme();
}

function ChangeTheme()
{
    let colors;

    switch(window.sessionStorage.getItem('theme'))
    {
        case 'dark':
            colors = 
            ['161616','424242','E3F2FD','E3F2FD','161616','161616',
            '101010','263238','2E7D32','1B5E20','000000'];
            SetThemeToPage(colors);
            AddInversionToArrow();
            break;
        case 'light':
            colors = 
            ['81D4FA','BDBDBD','212121','161616','ffffff','2196F3',
            '304FFE','C5CAE9','00838F','006064', 'ffffff'];
            SetThemeToPage(colors);
            RemoveInversionFromArrow();
            break;
        default:
            colors = 
            ['1A237E','1E88E5','E3F2FD','263238','64B5F6','4B87B7',
            '263238','546E7A','00695C','004D40','ffffff'];
            SetThemeToPage(colors);
            AddInversionToArrow();
    }
}

function SetThemeToPage(arrayOfValues)
{
    const root = document.documentElement.style;
    
    for(var i = 0; i < arrayOfValues.length; i++)
    {
        root.setProperty(ThemeFields[i], `#${arrayOfValues[i]}`);
    }
}

function AddInversionToArrow()
{
    let arrow = document.getElementById('scrollArrow');
    if(!arrow.classList.contains('inverted'))
    {
        arrow.classList.add('inverted');
    }
}

function RemoveInversionFromArrow()
{
    let arrow = document.getElementById('scrollArrow');
    if(arrow.classList.contains('inverted'))
    {
        arrow.classList.remove('inverted');
    }
}